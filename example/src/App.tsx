import React from 'react'
import * as LHCForm from '@medigy/ux-react-lhc-form';
import '@medigy/ux-react-lhc-form/dist/index.css';
const gitLabApi: string = '<GitLab Base URL>/api/v4/projects/<GitLab Project ID>/repository/files';
const filePath: string = '<LHC Form File Path>';
const branch: string = '<GitLab Branch>';
const apiURL: string = `${gitLabApi}/${encodeURIComponent(filePath)}?ref=${branch}`;
const accessToken: string = '<GitLab Access Token>';
const lhcFormRef: React.RefObject<LHCForm.LHCFormComponent> = React.createRef();
const App = () => {
  return <div>
    <LHCForm.LHCFormComponent
      ref={lhcFormRef}
      LHCFormPath={apiURL}
      accessToken={accessToken}
    />
    <input type='button' value='Get Form Data' onClick={getData} />
  </div>
}
// To get data from the LHC Form
const getData = (): void => {
  const formData:
    | Array<LHCForm.ILHCFormData>
    | undefined = lhcFormRef.current?.getLHCFormData();
  console.log(formData);
}

export default App
