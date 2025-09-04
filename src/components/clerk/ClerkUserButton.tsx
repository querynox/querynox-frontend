import { UserButton } from "@clerk/clerk-react"
import useQueryUserPortal from "./queries/useQueryUserPortal"

const ClerkUserButton = () => {
  const {refetch} = useQueryUserPortal();
  const onClickPayments = async () =>{
    const {data} =await refetch();
    if(data)
    window.open(data, "_blank", "width=800,height=600,scrollbars=yes,resizable=yes");
  }
  return (
    <UserButton appearance={{elements: { avatarBox: "h-8 w-8"}}}>
          <UserButton.MenuItems>
            <UserButton.Action
                label="Manage Payments"
                labelIcon={
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" ry="2"/>
                  <line x1="2" y1="10" x2="22" y2="10"/>
                  <line x1="6" y1="15" x2="8" y2="15"/>
                  <line x1="10" y1="15" x2="14" y2="15"/>
                </svg>
                }
                onClick={onClickPayments}
            />          
        </UserButton.MenuItems>
    </UserButton>
  )
}

export default ClerkUserButton
