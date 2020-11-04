# ux-react-lhc-form
React component for listing LHC form from GitLab

## Installation

---
Create .npmrc file in the project root and add the following GitHub package registry code in the file.

```bash
   @medigy:registry=https://npm.pkg.github.com
```

Then, Install from the command line:

```bash
    npm install @medigy/ux-react-lhc-form
```
OR

Install via package.json:
```bash
    "@medigy/ux-react-lhc-form": "^1.0.1"
```

## To list the LHC Form:

Import the following library and styles in your page
```javascript
    import * as LHCForm from '@medigy/ux-react-lhc-form';
    import '@medigy/ux-react-lhc-form/dist/index.css';
```
Declare a variable in your component like the following 
```javascript
const lhcFormRef: React.RefObject<LHCForm.LHCFormComponent> = React.createRef();
```
Then include the component in your render method like the following

```javascript
    <LHCForm.LHCFormComponent
      ref={lhcFormRef}
      LHCFormPath={apiURL}
      accessToken={accessToken}
    />
```


Props Configuration

| Key| Value| Type |
|---|---|---|
|LHCFormPath | GitLab API URL for the LHC Form | String
|accessToken| GitLab personal access token | String

## To get the LHC Form data:
```javascript
const formData:| Array<LHCForm.ILHCFormData>| undefined = lhcFormRef.current?.getLHCFormData();
```

