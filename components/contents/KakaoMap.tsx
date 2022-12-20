import { useRef, useEffect, useState } from 'react';
import styles from './KaKaoMap.module.scss';

declare global {
  interface Window {
    kakao: any;
  }
}

interface Props {
  latitude?: number;
  longitude?: number;
}

export default function KakaoMap({ latitude=0, longitude=0 }: Props) {
  const [ dong, setDong ] = useState<string>('');
  const [ lat, setLat ] = useState<number>(latitude);
  const [ lng, setLng ] = useState<number>(longitude);
  const [ isError, setIsError ] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mapScript = document.createElement('script');
    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&autoload=false&libraries=services`;

    document.head.appendChild(mapScript);

    const load = () => {
      window.kakao.maps.load(() => {
        getPosition();

        const options = {
          center: new window.kakao.maps.LatLng(lat, lng),
        };
        const map = new window.kakao.maps.Map(containerRef.current, options);
        const markerPosition = new window.kakao.maps.LatLng(lat, lng);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);

        var geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.coord2Address(lng, lat, (result: any, status: any) => {
          if ( status === window.kakao.maps.services.Status.OK )
            setDong(result[0].address?.region_3depth_name);
        });
      });
    };

    mapScript.addEventListener("load", load);
    // return mapScript.removeEventListener("load", load);
  }, [lat, lng]);
  
  return (
    <>
      <div className={`${styles.map} ${isError ? styles.error:''}`} ref={containerRef} />
      <div className={`${styles.sub} ${isError ? styles.error:''}`}>
        {isError ? '현재 위치를 가져오는 데 문제가 발생했습니다. 위치 권한을 확인하시고 다시 시도하시거나 고객센터로 문의해주시기 바랍니다.':dong}
      </div>
    </>
  );

  function success(position: GeolocationPosition) {
    setLat(position.coords.latitude);
    setLng(position.coords.longitude);
  }

  function error() {
    setIsError(true);
  }

  function getPosition() {
    navigator.geolocation.getCurrentPosition(success, error);
  }
}