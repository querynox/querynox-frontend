import { apiRequest } from "@/lib/apiClient"
import { useAuth } from "@clerk/clerk-react";

export const useCheckoutLink = () => {
    const { getToken } = useAuth();
    const getCheckoutLink = async (productID:string, plan:string, source:string, callback:string) : Promise<{url:string}> => {
        try{
            if(!productID || !plan || !source) return {url:""};
            const token = await getToken(); 
            const data = await apiRequest<{url:string}>(`/payments/checkout/${productID}`,'GET',{},{"authorization":`Bearer ${token}`},{plan,source,callback});
            return data;
        }catch(error){
            return {url:""};
        }
    } 
    return getCheckoutLink;
}
export default useCheckoutLink;