import L from 'leaflet';

export const createTimeMarkerIcon = (duration: string, locationText: string, type: "pickup" | "destination") => {
  let hoursPart = "";
  let minutesPart = "";
  
  if (duration.includes("h") || duration.includes("hr")) {
    const regex = /(\d+\s*(?:h(?:r)?))\s*(\d+)\s*min/i;
    const match = duration.match(regex);
    if (match) {
      hoursPart = match[1].trim();
      minutesPart = match[2].trim() + " min";
    } else {
      const parts = duration.split(" ");
      hoursPart = parts[0];
      minutesPart = parts.slice(1).join(" ");
    }
  } else {
    const regex = /(\d+)\s*min/i;
    const match = duration.match(regex);
    if (match) {
      hoursPart = match[1].trim();
      minutesPart = "min";
    } else {
      hoursPart = duration;
      minutesPart = "";
    }
  }

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
                    width: 40px;
                    border-radius: 4px;
                    display: grid;
                    grid-template-rows: auto auto;
                    text-align: center;
                    padding: 2px 0;
                    line-height: 1.2;
                  ">
                    <div style="
                      font-weight: 600;
                      font-size: 13px;
                      margin-bottom: -1px;
                    ">${hoursPart}</div>
                    <div style="
                      font-weight: 600;
                      font-size: 11px;
                      margin-top: -1px;
                    ">${minutesPart}</div>
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