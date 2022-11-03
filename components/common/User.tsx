import { tempUserData, userAtom } from "@/store/common";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

export default function User() {
  const [user, setUser] = useRecoilState
  (userAtom);
  const users = useRecoilValue(tempUserData);

  useEffect(() => {
    if ( localStorage.getItem('user') ) {
      users.map((v,k) => {
        if ( v.auth === localStorage.getItem('user') ) {
          setUser(v);
        }
      });
    }
  })

  return (<></>);
}