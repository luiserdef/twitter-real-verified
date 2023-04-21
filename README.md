<p align="center">
  <img src="assets/Icon.png" width="200px" alt="Real Verify Extension" />
</p>
<h3 align="center">Twitter Real Verified</h3>
<p align="center">
Return Twitter's legacy verification and change the verification badge for users with a Twitter Blue subscription.
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

## Overview - Screenshots
<p> All the legacy verified badges that were removed due to Twitter Blue changes on april 20, 2023, will be restored</p>
<p>Legacy verified users was taken before april,6 2023. Thanks to the <a href="https://github.com/thansen0/verified_twitters">Verified Twitter User List</a> project.</p>
<p>Differentiate between users with a legacy verification badge and those who obtained it through a Twitter Blue subscription. The verification badge for users who obtained it through Twitter Blue will be replaced by a money badge.</p>
<p align="center">
  <img src="overview-img/twVerified-preview1.png" width="600px" alt="Real Verify Extension" />
  <img src="overview-img/twVerified-preview2.png" width="600px" alt="Real Verify Extension" />
</p>

## Dev
Popup it's created with React.
Proyect use esbuild.

After cloning the project.

```bash
 pnpm install # install dependencies

 #Generate the files for Chrome
 pnpm run build-chrome
 
 #Generate the files for Firefox
 pnpm run build-firefox
 
 
 #run and fix linter issues 
 #If you have the standardjs extension for VSCode, changes are made on save.)
 npx standard --fix 
```

Load the extension on Chrome or Edge:

- Access edge://extensions/ or chrome://extensions/
- Check Developer mode
- Click on Load unpacked extension
- Select the folder: chrome-extension.

Load the extension on Firefox

- Open the about:debugging page
- Click the This Firefox option
- Click the Load Temporary Add-on button
- Select any file in the folder firefox-extension

## :bulb: Can I contribute?
Off Course! You can open a new issue or pull request with a new improvement or fix bugs.
