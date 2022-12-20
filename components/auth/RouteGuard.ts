import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { tempUserData, userAtom } from '@/store/common';

interface Props {
  children?: any;
}

function RouteGuard({ children }: Props) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [user, setUser] = useRecoilState(userAtom);
  const users = useRecoilValue(tempUserData);

  useEffect(() => {
    // 컴포넌트가 로드되었을 때 - authCheck 호출
    authCheck(router.asPath);

    // 라우트 변경이 시작되었을 때 - authorized 상태를 false로 설정해 페이지의 콘텐츠를 숨김
    const hideContent = () => setAuthorized(false);
    router.events.on('routeChangeStart', hideContent);

    // 라우트 변경이 완료되었을 때 - authCheck 호출 
    router.events.on('routeChangeComplete', authCheck)

    // useEffet 반환 함수에서 이벤트를 해제
    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    }
  }, []);

  function authCheck(url: string) {
    // 로그인 없이 보안 요소가 포함된 페이지에 방문하려고 하면, 로그인 페이지로 리디렉션

    // 보안 요소 없는 경로들 패턴
    const publicPaths = [
      /\/signin/g,
      /\/signup/g,
      /\/password/g,
      /(\/song$|\/song\/(?!upload))/g,
      /\/profile\/(?!update)/g,
      /(\/post$|\/post\/(?!upload))/g,
      /\/$/g
    ];
    const path = url.split('?')[0];

    if ( !userCheck() && !publicPaths.some(v => v.test(path)) ) {
      setAuthorized(false);
      router.push({
        pathname: '/signin',
        query: { returnUrl: router.asPath }
      });
    } else {
      setAuthorized(true);
    }
  }

  // 현재 로그인 되어 있는지 확인하는 로직
  function userCheck() {
    if ( localStorage.getItem('user') ) {
      users.map((v,k) => {
        if ( v.auth === localStorage.getItem('user') ) {
          setUser(v);
        }
      });

      return true;
    } else {
      return false;
    }
  }

  return (authorized && children);
}

export default RouteGuard;