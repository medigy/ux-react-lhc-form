import axios from 'axios';
const gitLabURL: string = `<GITLAB BASE URL>`;
const accessToken: string = `<YOUR PERSONAL GITLAB ACCESS TOKEN>`;
const projectID: number = 1; // GITLAB PROJECT ID 
const filePath: string = '<LHC FORM FILE PATH>';
const branch: string = '<PROJECT BRANCH>';

describe('Test to check the project exist or not', () => {
  test('The project name should be a string', async () => {
    const projectInfo = await axios.get(`${gitLabURL}/api/v4/projects/${projectID}?access_token=${accessToken}`);
    expect(projectInfo).toBeDefined();
    expect(projectInfo.status).toBe(200);
    expect(projectInfo.data).toBeDefined();
    expect(projectInfo.data.path).toBeDefined();
    expect(typeof projectInfo.data.name).toBe('string');
  })
})

describe('Test to check the LHC form exist or not', () => {
  test('The data content should be a string', async () => {
    const lhcFormInfo = await axios.get(`${gitLabURL}/api/v4/projects/${projectID}/repository/files/${encodeURIComponent(filePath)}?ref=${branch}&access_token=${accessToken}`);
    expect(lhcFormInfo).toBeDefined();
    expect(lhcFormInfo.status).toBe(200);
    expect(lhcFormInfo.data).toBeDefined();
    expect(typeof lhcFormInfo.data.content).toBe('string');
  })
})
