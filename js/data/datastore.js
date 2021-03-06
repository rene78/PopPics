export default new class DataStore {

  constructor() {
    // create datastores
    this.pictureArr = []; //Array with all pics and usage counts
    this.meta = {}; //userName, nPics, nUsages
  }

  // getRequest() and setRequest() are the primary getters/setters
  getRequest(subscriber) {
    return this[subscriber.request]();//return needed because we want to send the data back to the component
  }

  setRequest(request) {
    this[request.newInfo](request.data, request.userName);//no return, because nothing is sent back to component
  }

  // <- all datastore SUBSCRIBERS get info here ->

  getMeta() {
    //Return object with "userName, nPics, nUsages"
    return this.meta;
  }

  getPictureArr() {
    return this.pictureArr;
  }

  // <- all datastore PUBLISHERS publish info here ->

  PicsDownload(pics, userName) {
    pics.data.sort((a,b) => b[0] - a[0]);//Sort descending according to usage count
    this.pictureArr = pics; 
    // console.log(this.pictureArr);
    this.meta.userName = userName;
    this.meta.nPics = pics.data.length;
    this.meta.nUsages = pics.data.reduce((accumulator, picture) => accumulator + picture[0], 0);
    // console.log(this.meta);
  }

  InfoMessage(modalObj, userName) {
    // this.meta.userName = userName; //not used
    this.meta.text = modalObj.text;
    this.meta.type = modalObj.type;
  }
}