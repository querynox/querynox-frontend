import { apiRequest } from "@/lib/apiClient"

const getCheckoutLink = async (productID:string,userId:string, plan:string, source:string, callback:string) : Promise<{url:string}> => {
    try{
        if(!productID || !userId || !plan || !source) return {url:""};
        const data = await apiRequest<{url:string}>(`/payments/checkout/${productID}`,'GET',{},{},{userId,plan,source,callback});
        return data;
    }catch(error){
        return {url:""};
    }
} 
export default getCheckoutLink;