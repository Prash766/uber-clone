import L from 'leaflet';

export const createTimeMarkerIcon = (duration: string, locationText: string, type: string) => {
  return L.divIcon({
    className: "custom-time-marker",
    html: `
      <div style="position: relative; width: 100%;">
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(5px, -50%);
          background: black;
          color: white;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 13px;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: ${type === "pickup" ? "8px" : "0px"};
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        ">
          ${
            type === "pickup"
              ? `<div style="
                    background: white;
                    color: black;
                    width: 32px;
                    height: 28px;
                    border-radius: 4px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 0;
                    margin: 0;
                    line-height: 1;
                  ">
                    <div style="font-weight: 600; font-size: 13px;">${duration}</div>
                    <div style="font-size: 9px; margin-top: 2px;">min</div>
                  </div>`
              : ""
          }
          <span style="
            font-weight: 500;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            max-width: 170px;
            display: flex;
            align-items: center;
          ">${locationText}</span>
        </div>
      </div>
    `,
    iconSize: [type === "pickup" ? 200 : 170, 32],
    iconAnchor: [type === "pickup" ? 100 : 85, 16],
  });
};
