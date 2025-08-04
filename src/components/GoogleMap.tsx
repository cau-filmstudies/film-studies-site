import React, { useEffect, useRef } from 'react'

interface GoogleMapProps {
  center?: { lat: number; lng: number }
  zoom?: number
  apiKey: string
}

const GoogleMap: React.FC<GoogleMapProps> = ({
  center = { lat: 37.5068, lng: 126.9614 }, // 중앙대학교 흑석동 캠퍼스
  zoom = 15,
  apiKey
}) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInitialized = useRef(false)

  useEffect(() => {
    const initMap = async () => {
      if (mapInitialized.current || !mapRef.current) return

      try {
        // Google Maps JavaScript API 로드
        if (!(window as any).google) {
          const script = document.createElement('script')
          script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
          script.async = true
          script.defer = true
          
          script.onload = () => {
            createMap()
          }
          
          document.head.appendChild(script)
        } else {
          createMap()
        }
      } catch (error) {
        console.error('Google Maps 초기화 실패:', error)
      }
    }

    const createMap = () => {
      if (!mapRef.current) return

      const map = new (window as any).google.maps.Map(mapRef.current, {
        center: center,
        zoom: zoom,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true,
      })

      // 마커 생성
      const marker = new (window as any).google.maps.Marker({
        position: center,
        map: map,
        title: '중앙대학교 공연영상창작학부'
      })

      // 정보창 생성
      const infowindow = new (window as any).google.maps.InfoWindow({
        content: `
          <div style="padding: 10px; max-width: 200px;">
            <h3 style="margin: 0 0 5px 0; color: #1a365d; font-weight: bold;">
              중앙대학교 공연영상창작학부
            </h3>
            <p style="margin: 0; color: #666; font-size: 14px;">
              서울캠퍼스(흑석동) 301관(중앙문화예술관) 507호
            </p>
            <p style="margin: 5px 0 0 0; color: #666; font-size: 14px;">
              연락처: 02-820-5799
            </p>
          </div>
        `
      })

      // 마커 클릭 시 정보창 표시
      marker.addListener('click', () => {
        infowindow.open(map, marker)
      })

      // 초기 정보창 표시
      infowindow.open(map, marker)

      mapInitialized.current = true
    }

    initMap()

    return () => {
      // 클린업
      if (mapRef.current) {
        mapRef.current.innerHTML = ''
      }
    }
  }, [center, zoom, apiKey])

  return (
    <div 
      ref={mapRef} 
      className="w-full h-80 rounded-lg overflow-hidden shadow-lg"
      style={{ minHeight: '320px' }}
    />
  )
}

export default GoogleMap 