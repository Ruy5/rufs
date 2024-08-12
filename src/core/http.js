import createFileInput from "../utils/createFileInput";

export const createAxios = (
  axios,
  baseUrl,
  autoSetAuthorization = true,
  autoSetToken = true
) => {
  const http = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
  });

  http.interceptors.request.use(
    (config) => {
      if (!config.headers["Content-Type"]) {
        config.headers["Content-Type"] = "application/json;charset=UTF-8";
      }
      if (autoSetAuthorization && localStorage.getItem("token")) {
        config.headers["Authorization"] = localStorage.getItem("token");
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  http.interceptors.response.use(
    (response) => {
      if (autoSetToken && response.data.code == 200 && response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return http;
};

export const useRuoyiAuth = (axios) => {
  return {
    login: async (data) => {
      const res = await axios.post(`/login`, data);
      return res.data;
    },
    getInfo: async () => {
      const res = await axios.get(`/getInfo`);
      return res.data;
    },
  };
};

export const useRuoyiFileApi = (axios) => {
  return {
    uploadFile: () => {
      return new Promise(function (resolve, reject) {
        const upload = (file) => {
          const param = new FormData();
          param.append("file", file);
          const config = { headers: { "Content-Type": "multipart/form-data" } };
          axios
            .post("/common/upload", param, config)
            .then((data) => resolve(data))
            .catch((error) => reject(error));
        };
        createFileInput(upload);
      });
    },
  };
};

export const useRuoyiApi = (axios, prefix = "system") => {
  return {
    updateXhr: async (module, data = {}) => {
      const res = await axios.put(`/${prefix}/${module}`, data);
      return res.data;
    },
    insterXhr: async (module, data = {}) => {
      const res = await axios.post(`/${prefix}/${module}`, data);
      return res.data;
    },
    selectXhr: async (module, id) => {
      const res = await axios.get(`/${prefix}/${module}/${id}`);
      return res.data;
    },
    deleteXhr: async (module, id) => {
      const res = await axios.delete(`/${prefix}/${module}/${id}`);
      return res.data;
    },
    selectListXhr: async (module, params={}) => {
      const res = await axios.get(`/${prefix}/${module}/list`, {
        params: params
      });
      return res.data;
    },
  };
};

function capitalizeFirstLetter(string) {
  if (typeof string !== "string" || string.length === 0) {
    return string;
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const useRuoyiModuleApi = (axios, prefix = "system", module) => {
  const { updateXhr, insterXhr, selectXhr, deleteXhr, selectListXhr } =
    useRuoyiApi(axios, prefix);
  const func = {};
  func[`update${capitalizeFirstLetter(module)}Xhr`] = async (data) => {
    return await updateXhr(module, data);
  };

  func[`inster${capitalizeFirstLetter(module)}Xhr`] = async (data) => {
    return await insterXhr(module, data);
  };

  func[`select${capitalizeFirstLetter(module)}Xhr`] = async (id) => {
    return await selectXhr(module, id);
  };

  func[`delete${capitalizeFirstLetter(module)}Xhr`] = async (id) => {
    return await deleteXhr(module, id);
  };

  func[`select${capitalizeFirstLetter(module)}ListXhr`] = async (params) => {
    return await selectListXhr(module, params);
  };

  return func;
};
