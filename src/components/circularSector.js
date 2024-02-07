import React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const CircularSector = () => {
  const radius = 150;
  const angle = 45; // Angle of the sector in degrees

  // Convert degrees to radians
  const startAngle = 0;
  const endAngle = (angle * Math.PI) / 180;
  // Calculate control points for fillet effect
  const controlPoint1X = radius * Math.cos((angle / 2) * (Math.PI / 180));
  const controlPoint1Y = radius * Math.sin((angle / 2) * (Math.PI / 180));

  const pathData = `
    M ${radius} 0
    A ${radius} ${radius} 0 ${angle > 180 ? 1 : 0} 1 ${
    radius * Math.cos(endAngle)
  } ${radius * Math.sin(endAngle)}
    L 0 0
    Q ${controlPoint1X} ${controlPoint1Y} 0 0
    Z
  `;

  return (
    <View
      style={{
        borderWidth: 2,
        borderColor: '#fff',
        width: 135,
        height: 100,
        borderBottomLeftRadius: 0,
        borderTopRightRadius: 40,
        borderBottomRightRadius: 200,
        backgroundColor: 'transparent',
        zIndex: 10,
        overflow: 'hidden',
      }}>
      <Svg width={radius * 2} height={radius * 2}>
        <Path d={pathData} fill="#D9D9D9" />
      </Svg>
    </View>
  );
};

export default CircularSector;
