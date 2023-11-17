import { reactive, ref } from "vue";

const navigationState = reactive({
  sidebar: false
})
export const useNavigationState = () => navigationState 
