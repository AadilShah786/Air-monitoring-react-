import React, { useEffect, useState, useCallback } from "react";
import '../css/main.css';
import Main_left from "./main_left";
import Main_right from "./main_right";
import { info } from "./data_manage";

function Main({ rerender }) {
  const [rerender2, setrender2] = useState(false);

  const triggerrender2 = useCallback(() => {
    setter();
    setrender2(prevState => !prevState); // Toggle state
  }, []);

  useEffect(() => {
    
    triggerrender2();
  }, [rerender, info.data]);

  const generateRectangles = () => {
    function generateposition(left1, top1, radius, count) {
      var position = [];
      let hordif = 2 * radius / (count - 1);
      for (var i = 0; i < count; i++) {
        var to = i * hordif;
        var lef = left1 - Math.sqrt(radius * radius - (radius - i * hordif) * (radius - i * hordif));

        var pos = { left: lef, top: to };
        if (i === 0 || i === count - 1) { }
        else { position.push(pos); }
      }
      //console.log(position,radius,left1,top1)
      return position;
    }

    const rectangles = [];
    const background = info.colors;
    const positions = generateposition(220, 50, 175, 9);
    // [
    //   { left: 229, top: 50},
    //   { left: 208, top: 110 },
    //   { left: 197, top: 168 },
    //   { left: 193, top: 225 },
    //   { left: 197, top: 277},
    //   { left: 208, top: 340 },
    //   { left: 229, top: 400 },
    // ];
    
    var item = info.data.pollutants;
    var par = [item.PM10, item["PM2.5"], item.NO2, item.OZONE, item.SO2, item.CO, item.NH3,]
    const keysArray = [ 'PM10','PM2.5','NO2', 'OZONE', 'SO2', 'CO',  'NH3']
    for (let i = 0; i < positions.length; i++) {
      let style= {
        left: positions[i].left,
        top: positions[i].top,
        backgroundColor: background[i + 1],
        opacity:"0.8",
        transition: 'transform 0.5s ease-in-out',
      }
      if(info.selected.key===keysArray[i]){
        style.transform="translate(70px,0px)";
        style.opacity="1";
        //console.log("selected",keysArray[i],info.selected.key,style.transform)
      }else{
        style.transform="translate(0px,0px)";
        style.opacity="0.9";
       // console.log("not selected",i,par[i],info.selected.key,style.transform)
      }
      rectangles.push(
        <Main_left
          key={i}
          item={item}
          value={par[i]}
          trigger={triggerrender2}
          style={style}
        />
      );
    }

    return rectangles;
  };

  // To render the rectangles, you can call generateRectangles() within your component's render/return method.
  const [rectangles, setrect] = useState(generateRectangles());
  function setter() {
   
    var rect = generateRectangles();
    setrect(rect);
  }
  return (

    <div className="Main">
      {rectangles}
      <Main_right rerender={rerender2} />
    </div>
  )
}

export default Main;