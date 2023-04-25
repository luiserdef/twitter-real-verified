<p align="center">
  <img src="overview-img/icon.png" width="200px" alt="Real Verify Extension" />
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
        <p align="center">Firefox :green_circle: Available</p>
      </a>
    </td>
        <td valign="center">
      <a href="https://microsoftedge.microsoft.com/addons/detail/twitter-real-verified/llkfeengcmnpbpcgmchgjcjmfoekedij">
        <img height ="55px" src="https://www.siteimprove.com/globalassets/media/shared/page-specific/integrations/browser-extensions/microsoftstore.png?mode=crop" alt="Firefox add-ons" />
        <p align="center">Edge :green_circle: Available</p>
      </a>
    </td>
        <td valign="center">
      <a href="https://chrome.google.com/webstore/detail/twitter-real-verified/jgpfnkhpecliocnopchaoogpmnejlghn">
        <img height ="55px" src="https://www.siteimprove.com/globalassets/media/shared/page-specific/integrations/browser-extensions/chrome-webstore.png" alt="Chrome extension" />
        <p align="center">Chrome :green_circle: Available</p>
      </a>
    </td>
  </tr>
</table>

## Overview - Screenshots
<p>Installing this add-on will restore all the legacy verified badges that were removed due to Twitter Blue changes on April 20, 2023.</p>
<p>The list of legacy verified users was taken before April 6, 2023. Thanks to the <a href="https://github.com/thansen0/verified_twitters">Verified Twitter User List</a> project.</p>
<p>This add-on can differentiate between users with a legacy verification badge and those who obtained it through a Twitter Blue subscription. The verification badge for users who obtained it through Twitter Blue will be replaced by a money badge.</p>
<p align="center">
  <img src="overview-img/twVerified-preview1.png" width="600px" alt="Real Verify Extension" />
  <img src="overview-img/twVerified-preview2.png" width="600px" alt="Real Verify Extension" />
</p>

## What's New: 
### Updates Coming in the Next Release
- Hide Twitter Blue badges
- More accurate data on legacy verified accounts provided by <a href="https://twitter.com/travisbrown/status/1649129052479844363">Travisbrown's</a> <a href="https://gist.github.com/travisbrown/b50d6745298cccd6b1f4697e4ec22103">legacy-verified</a> list project.

## Dev
Popup is created with React.
The project uses esbuild.

After cloning the project, do the following:

```bash
 pnpm install # install dependencies

 #Generate the files for Chrome
 pnpm run build-chrome
 
 #Generate the files for Firefox
 pnpm run build-firefox
 
 
 #run and fix linter issues 
 #If you have the standardjs extension for VSCode, changes are made on save.
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
Of course! You can open a new issue, or a pull request with a new improvement, or fix bugs.
