/* import { API_URL } from "../../../../package.json";
import axios from "axios";

class appViewsApi {
  static updateUserProfile(file, field) {
    var data = new FormData();
    data.append("uploadedFile", file[0]);
    data.append("json", JSON.stringify(field));

    const request = new Request(API_URL + `/User/updateuserprofile`, {
      method: "PUT",
      headers: new Headers({
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }),
      body: data
    });

    return fetch(request)
      .then(response => {
        if (response.status >= 400 && response.status < 600) {
          if (response.status === 401) {
            
          } else {
            return response.text().then(text => {
              return Promise.reject(text);
            });
          }
        }

        return response
          .json()
          .then(json => {
            if (json.success == true) {
              return Promise.resolve(json);
            } else {
              return Promise.reject(json.message);
            }
          })
          .catch(error => {
            return Promise.reject(error);
          });
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }
}

export default appViewsApi;
 */
