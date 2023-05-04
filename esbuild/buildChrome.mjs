import * as esbuild from 'esbuild'
import { copySync } from 'fs-extra/esm'
import svgr from 'esbuild-plugin-svgr'

const CHROMEOUTPUT = './chrome-extension'

const files = [
  { out: 'popup/popup', in: './src/popup/popup.css' },
  { out: 'popup/popup', in: './src/popup/popup.html' },
  { out: 'popup/popup', in: './src/popup/index.jsx' },
  { out: 'contentScript', in: './src/contentScript.js' },
  { out: 'background', in: './src/background.js' },
  { out: 'script', in: './src/script.js' }
]

esbuild.build({
  entryPoints: files,
  // minify: true,
  bundle: true,
  outdir: CHROMEOUTPUT,
  loader: { '.html': 'copy', '.png': 'file' },
  plugins: [svgr()]
}).then(() => {
  copySync('./src/assets', `${CHROMEOUTPUT}/assets`)
  copySync('./src/_locales', `${CHROMEOUTPUT}/_locales`)
  copySync('./manifestV3.json', `${CHROMEOUTPUT}/manifest.json`)
  copySync('./src/verifiedUsersID1.js', `${CHROMEOUTPUT}/verifiedUsersID1.js`)
  copySync('./src/verifiedUsersID2.js', `${CHROMEOUTPUT}/verifiedUsersID2.js`)
  copySync('./src/verifiedUsersScreenName1.js', `${CHROMEOUTPUT}/verifiedUsersScreenName1.js`)
  copySync('./src/verifiedUsersScreenName2.js', `${CHROMEOUTPUT}/verifiedUsersScreenName2.js`)
}).catch(error => {
  console.log('Build failed in buildChrome:' + error)
})
