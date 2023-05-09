import MDP from "./MDP";

export default class FStaticTabMDP implements MDP {
  componentName = "FStaticTab";

  tabList: FStaticTabContentMDP[] = [];
  myRefName: string;

  constructor({ myRefName }: { myRefName: string }) {
    this.myRefName = myRefName;
  }

  addTab(tab: FStaticTabContentMDP) {
    this.tabList.push(tab);
    return this;
  }

  getMetaData(): object {
    return {
      myRefName: this.myRefName,
      componentName: this.componentName,
      props: {
        myRefName: this.myRefName,
        tabMetaDataList: this.tabList.map(tab => tab.getMetaData()),
      },
    };
  }

  
}



export class FStaticTabContentMDP implements MDP {
    name: string;
    tabContent: MDP;
    constructor({
      name,
      tabContent,
    }: {
      name: string;
      tabContent: MDP;
    }) {
      this.name = name;
      this.tabContent = tabContent;
    }
  
    getMetaData(): object {
      return {
        tabName: this.name,
        tabContent: this.tabContent.getMetaData(),
      };
    }
  }
