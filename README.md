<p align="center">
  <img src="assets/Icon.png" width="200px" alt="Real Verify Extension" />
</p>
<h3 align="center">Twitter Real Verified</h3>
<p align="center">
 Change the Twitter verification badge for those who have obtained it through a Twitter Blue subscription
</p>
<table cellspacing="0" cellpadding="0" align="center">
  <tr>
    <td valign="center">
      <a href="https://addons.mozilla.org/es/firefox/addon/twitter-real-verified/">
        <img src="https://user-images.githubusercontent.com/22908993/166417727-3481fef4-00e5-4cf0-bb03-27fb880d993c.png" alt="Firefox add-ons" />
        <p align="center">Firefox Add-ons</p>
      </a>
    </td>
        <td valign="center">
      <a href="https://microsoftedge.microsoft.com/addons/detail/twitter-real-verified/llkfeengcmnpbpcgmchgjcjmfoekedij">
        <img height ="55px" src="https://www.siteimprove.com/globalassets/media/shared/page-specific/integrations/browser-extensions/microsoftstore.png?mode=crop" alt="Firefox add-ons" />
        <p align="center">Edge Extension</p>
      </a>
    </td>
        <td valign="center">
      <a href="https://chrome.google.com/webstore/detail/twitter-real-verified/jgpfnkhpecliocnopchaoogpmnejlghn">
        <img height ="55px" src="https://www.siteimprove.com/globalassets/media/shared/page-specific/integrations/browser-extensions/chrome-webstore.png" alt="Chrome extension" />
        <p align="center">Chrome Extension</p>
      </a>
    </td>
  </tr>
</table>
## 👀 Overview - Screenshots
<p>This extension allows you to differentiate between users with a legacy verification badge and those who obtained it through a Twitter Blue subscription. The verification badge for users who obtained it through Twitter Blue will be replaced by a money icon.</p>
<p align="center">
  <img src="overview-img/twVerified-preview1.png" width="600px" alt="Real Verify Extension" />
  <img src="overview-img/twVerified-preview2.png" width="600px" alt="Real Verify Extension" />
</p>

## Dev
It is created with React and bundled with esbuild.

After cloning the project.

```bash
 pnpm install # install dependencies

 #Generate the files for testing in Chrome and Firefox. Also, start watching for changes in files
 pnpm run dev

 #run and fix linter issues 
 #(Optional if you have the standardjs extension for VSCode and changes are made on save.)
 npx standard --fix 
```

Load the extension on Edge and Chrome:

- Access edge://extensions/ or chrome://extensions/
- Check Developer mode
- Click on Load unpacked extension
- Select the folder: edge-chrome.

Load the extension on Firefox
- Access about:addons
- In the left-hand menu of the "Add-ons Manager" page, select "Extensions".
- Click on the gear icon in the top-right corner and select "Install Add-on From File" from the dropdown menu.
- Select the folder: firefox.

## :bulb: Can I contribute?
Off Course! You can open a new issue or pull request with a new improvement or fix bugs.
