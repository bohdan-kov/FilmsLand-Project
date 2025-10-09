import { useRouter } from "vue-router";

export const logout = () => {
  const router = useRouter();
  localStorage.removeItem("token");
  localStorage.removeItem("id");
  router.push("/authorization/login");
};