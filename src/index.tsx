import * as React from 'react'
import * as LForms from 'lforms';
const utf8 = require("utf8");
interface ILHCFormProps {
  readonly LHCFormPath: string;
  readonly accessToken: string;
}
interface ILHCFormState {
  loader: boolean;
}
interface ILHCFormResponse {
  file_name: string;
  file_path: string;
  size: number;
  encoding: string;
  content_sha256: string;
  blob_id: string;
  commit_id: string;
  content: string;
  ref: string;
  last_commit_id: string;
}
interface IAnswers {
  code: string;
  text: string;
}
interface ILHCFormItems {
  answerCardinality: { [key: string]: string };
  answers: Array<IAnswers>;
  dataType: string;
  linkId: string;
  question: string;
  questionCardinality: { [key: string]: string };
  questionCode: string;
  questionCodeSystem: string;
  value: IAnswers;
}
export interface ILHCFormData {
  code: string;
  hasSavedData: boolean;
  lformsVersion: string;
  name: string;
  template: string;
  items: Array<ILHCFormItems>;
}
export class LHCFormComponent extends React.Component<
  ILHCFormProps,
  ILHCFormState
  > {
  public componentDidMount = (): void => {
    let apiURL: string = `${this.props.LHCFormPath}`;
    apiURL = apiURL.includes("?")
      ? `${apiURL}&access_token=${this.props.accessToken}`
      : `${apiURL}?access_token=${this.props.accessToken}`;
    const responseData: Promise<ILHCFormResponse> = this.fetchData(apiURL);
    responseData.then((responseData: ILHCFormResponse) => {
      if ("content" in responseData) {
        let dataContent: string = atob(responseData.content);
        dataContent = utf8.decode(dataContent);
        dataContent = JSON.parse(dataContent);
        LForms.Util.addFormToPage(dataContent, "gitLabLHCFormData");
      }
    });
  };
  public render(): React.ReactElement<ILHCFormProps> {
    return <div id="gitLabLHCFormData"></div>;
  }
  public getLHCFormData = (): Array<ILHCFormData> => {
    const formData = LForms.Util.getFormData(
      "#gitLabLHCFormData",
      false,
      false,
      true
    );
    return formData;
  };
  private fetchData = (apiURL: string): Promise<ILHCFormResponse> => {
    return new Promise((resolve) => {
      fetch(apiURL, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          resolve(error);
        });
    });
  };
}
