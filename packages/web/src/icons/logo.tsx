import React from "react";
import { DEFAULT_COLOR, DEFAULT_HEIGHT, DEFAULT_WIDTH, SvgProps } from "./type";

export const LogoSvg = React.memo<SvgProps>(
  ({
    color = DEFAULT_COLOR,
    width = DEFAULT_WIDTH,
    height = DEFAULT_HEIGHT,
  }) => {
    return (
      <svg
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
      >
        <path
          d="M221.2 394c-4.9 1.2-94.4 20.8-67.4 64.9 10.3 16.9 108.3 50.9 240.7 58.8 208.3 12.5 483.3-8.5 494.5-25.7 18.4-28.2 12.3-112.7-55.1-104.2S221.2 394 221.2 394z"
          fill="#FF694B"
          p-id="5026"
        ></path>
        <path
          d="M221.2 503c-4.9 1.2-62.5 22.1-67.4 64.9-5.9 51.4 665.4 88.2 716.9 30.6 22.4-25.1 2.5-105.4-64.9-96.8-67.5 8.7-584.6 1.3-584.6 1.3z"
          fill="#FF694B"
          p-id="5027"
        ></path>
        <path
          d="M155.3 381.8s-83.1 31.7-35.6 62c36.3 23.2 62-1.3 104.2-5.3 68.3-6.4 92.1 27 130.6 6.6s98.5-13.9 116.1-3.1c47.5 29 88.5-1.5 110.8-6.1 42.2-8.8 75.2 37.3 135.9 12.7 55.4-22.4 71-18.1 93.7-10.1 40.9 14.5 58.9-0.9 77.9 7.9 39.6 18.5 47.5-55.4-21.2-66M155.3 673.1s-83.1-31.7-35.6-62c36.3-23.2 62 1.3 104.2 5.3 68.3 6.4 92.1-27 130.6-6.6 38.6 20.4 98.5 13.9 116.1 3.1 47.5-29 88.5 1.5 110.8 6.1 42.2 8.8 75.2-37.3 135.9-12.7 55.4 22.4 71 18.1 93.7 10.1 40.9-14.5 58.9 0.9 77.9-7.9 39.6-18.5 47.5 55.4-21.2 66"
          fill="#8FC31F"
          p-id="5028"
        ></path>
        <path
          d="M199.1 505.5L134.2 595s191.2 8.6 401.9-24.5c206.6-32.4 313.7-64.9 313.7-64.9"
          fill="#FFE200"
          p-id="5029"
        ></path>
        <path
          d="M867.7 380.5c-0.3-122.6-159.1-253.7-355-253.7S158 257.9 157.7 380.5h710z"
          fill="#FFB000"
          p-id="5030"
        ></path>
        <path
          d="M501.4 126.7c-14.3 0-28.3 0.9-42.1 2.2 176 17 312.7 137.8 313 251.5h84.2c-0.3-122.6-159.2-253.7-355.1-253.7z"
          fill="#E59900"
          p-id="5031"
        ></path>
        <path
          d="M867.7 674.8c-0.3 107.5-83.6 222.4-355 222.4-277.3 0-354.7-114.9-355-222.4h710z"
          fill="#FFB000"
          p-id="5032"
        ></path>
        <path
          d="M786.5 674.8c-0.3 102-75.5 210.4-314.8 221.4 13.3 0.6 26.7 1.1 41 1.1 271.4 0 354.7-114.9 355-222.4l-81.2-0.1z"
          fill="#E59900"
          p-id="5033"
        ></path>
        <path
          d="M331.3 211c58.2-44.9 137.3-77.2 225.8-83.1-9.6-0.6-35.4-1.2-45.2-1.2-195.9 0-354.7 131.1-355 253.7H231c0.1-38.9 16.4-78.5 44.5-114.6 6.4 14.9 21.3 25.4 38.6 25.4 23.2 0 42-18.8 42-42 0-17-10.2-31.6-24.8-38.2zM220 674.8h-47c0.3 107.5 77.7 222.4 355 222.4 8.1 0 15.5-0.4 23.3-0.6-257.6-6.5-331-117.5-331.3-221.8z"
          fill="#FFFFFF"
          p-id="5034"
        ></path>
        <path
          d="M265.7 224.6c-3.7 0-7.5-1.2-10.9-3.6-8.2-5.7-9.4-17.8-3.7-26 0.7-1 2.8-3.3 3.7-4.1 7.1-6.9 18.5-6.7 25.5 0.5 6.9 7.2 6.7 18.6-0.5 25.5l-0.6 0.6c-3.4 4.8-8.3 7.1-13.5 7.1z"
          fill="#662F0A"
          p-id="5035"
        ></path>
        <path
          d="M902.8 587.7c3.9-11.6 5-24.5 2.1-37.4-3.6-16.2-13.9-33.3-32.4-44.1 20.3-9.6 28.7-21.9 31.9-37.4 0.1-0.5-0.1-1.1 0-1.6 7.1-0.7 13.6-3.3 19.1-8 12-10.2 16.5-28.5 11.4-46.4-6.4-22.3-24.8-39.1-50.4-46.7-11.6-124.3-166.7-257.2-371.9-257.2-72.9 0-144.7 17.5-207.7 50.6-8.8 4.6-12.2 15.5-7.6 24.3s15.5 12.3 24.3 7.6c57.9-30.4 123.9-46.4 191-46.4 179.1 0 320.5 113.3 335.7 217.8H177c5.3-37.1 26.3-75.5 60.5-110 7-7.1 7-18.5-0.1-25.5-7.1-7.1-18.5-6.9-25.5 0.1-43 43.3-67.9 93.1-71.6 141.4-18.3 8.1-50.6 25.8-53.2 51.8-1.1 10.3 2 25.4 22.8 38.7 7.6 4.8 14.9 8 21.9 10 2.1 10.4 12.8 23.5 45.9 35.3l-58.2 80.1c-1.7 2.4-2.6 5.1-3 7.9-2.2 1.2-4.4 2.2-6.7 3.6C89 609.5 85.9 624.6 87 634.9c2.6 25.8 34.5 43.5 52.8 51.6 4.2 77.1 53 229.1 372.7 229.1 83.1 0 154.1-10.7 211-31.9 9.3-3.5 14.1-13.8 10.6-23.2-3.5-9.3-13.7-14.1-23.2-10.6-52.8 19.6-119.6 29.6-198.4 29.6-206.8 0-325.3-66-336.2-186.4h672.3c-3.4 32.8-16.6 73.9-55.7 109.1-7.4 6.7-7.9 18-1.3 25.4 6.6 7.4 18.1 8 25.4 1.3 41.2-37.2 64.3-85.4 67.8-139.9 25.4-7.7 43.7-24.4 50-46.6 5.1-18 0.6-36.2-11.4-46.4-5.8-5.3-12.9-7.9-20.6-8.3z m-426.7-89.2c-194.9-0.7-268.4-19.7-295.4-31.5 3.6-1 7.1-2 10.5-3 10.8-3.2 22-6.5 34.3-7.6 29-2.7 49.1 2.5 66.9 7.2 21.6 5.7 43.9 11.5 70.5-2.6 32.3-17.2 85.6-11.4 98.3-3.7 44.2 27 84.6 11.1 108.7 1.5 6-2.4 11.6-4.6 15.2-5.3 12.6-2.6 25.1 2 41 7.9 15.8 5.8 33.9 12.5 55.6 12.5 12.8 0 26.9-2.3 42.4-8.6 50.7-20.5 62.1-16.5 80.9-9.8 27 9.6 45.8 7.9 59.5 6.7 1.7-0.2 3.1-0.3 4.5-0.4-8.1 33.5-193.8 37.2-392.9 36.7z m351.3 31.8c1.5 0.4 2.8 1 4.4 1.1 20.5 0.8 34.4 10.5 37.9 26.7 3 13.4-2.3 27-12.4 32.3-0.9 0.4-1.4 1.2-2.2 1.7-12.7-0.7-28.8-0.2-50.1 7.3-18.8 6.7-30.2 10.7-80.9-9.8-41.7-16.9-72.9-5.3-98 3.9-15.9 5.9-28.5 10.5-41 7.9-3.6-0.8-9.2-3-15.2-5.3-7.1-2.8-15.7-6.1-25.3-8.8 144.9-23 239.3-45.5 282.8-57zM129.3 428.6c-4.5-2.9-5.9-4.8-6.3-4.8 2-6.1 20.9-18.4 38.6-25.2 0.1 0 0.1-0.1 0.1-0.1H866c24.4 4.1 31.8 16.9 33.8 22.3 2.3 6 1.1 10.2 1.2 10.5-0.5 0.2-1.9 0-4.4-1.2-12.5-5.8-24-4.9-35.2-3.8-12.2 1.1-24.7 2.2-44.2-4.7-29.3-10.4-49.4-12.8-106.5 10.4-28.8 11.6-48.8 4.3-72-4.3-18.7-6.9-38.1-14.1-60.8-9.4-6.7 1.4-13.7 4.2-21.2 7.1-22.3 8.9-47.7 18.9-76.7 1.2-24.1-14.8-91-20.2-133.9 2.6-13.6 7.2-23.5 5.1-44.6-0.4-19.6-5.1-44-11.5-79.3-8.2-15.8 1.5-29.3 5.4-41.1 8.9-23.3 6.9-35.2 9.6-51.8-0.9z m84.4 87.4c0.4-0.5 0.4-1.1 0.7-1.6 51.2 11.3 132.6 19.6 261.5 20.1 12.9 0 25.3 0.1 37.4 0.1 50.4 0 94.3-0.4 132.6-1.3-33.5 6.3-71 12.8-112.7 19.4-154.9 24.4-300.6 25.8-364.4 25.1l44.9-61.8z m243.7 83.2c-10.2 4.1-31.2 7.1-53.1 5.4 17.3-1.6 35-3.4 53.1-5.4z m442.3 34.9c-2 5.5-9.6 18.7-34.8 22.6-0.2 0-0.4 0.2-0.6 0.2H162.5c-0.3-0.1-0.5-0.4-0.9-0.6-17.7-6.7-37.2-19.6-38.8-24.3 0 0 1-2.2 6.5-5.7 16.6-10.5 28.5-7.7 51.8-0.9 11.9 3.5 25.3 7.5 41.1 9 35.3 3.3 59.7-3.1 79.3-8.2 21.1-5.5 30.9-7.7 44.6-0.4 43 22.7 109.8 17.3 133.9 2.6 29-17.7 54.3-7.6 76.7 1.3 7.5 3 14.5 5.7 21.2 7.1 22.8 4.7 42-2.4 60.8-9.4 23.2-8.5 43.2-15.9 72-4.3 57.1 23.1 77.2 20.7 106.5 10.4 19.5-6.9 32.1-5.8 44.3-4.7 11.1 1 22.6 2 35.2-3.8 2.3-1.1 3.8-1.3 3.7-1.6 0.5 0.7 1.5 4.9-0.7 10.7z"
          fill="#662F0A"
          p-id="5036"
        ></path>
        <path
          d="M498.6 234.5c-5.4-5.6-1-11.2 9.8-12.6 10.8-1.4 23.9 2 29.3 7.5 5.4 5.6 1 11.2-9.8 12.6-10.7 1.5-23.9-1.9-29.3-7.5zM634.6 236c-6.6-4.1-3.7-10.7 6.4-14.6s23.6-3.9 30.2 0.2c6.6 4.1 3.7 10.7-6.4 14.6-10 4-23.6 3.9-30.2-0.2zM593.7 185.7c8.8 5.6 9.4 12.3 1.5 15-7.9 2.6-21.5 0.2-30.2-5.5-8.8-5.6-9.4-12.3-1.5-15 7.9-2.6 21.4-0.1 30.2 5.5zM499.7 185.9c-4.6 6.2-17.2 11.2-28.1 11.2s-15.9-5.1-11.3-11.3 17.2-11.2 28.1-11.2c10.9 0.1 15.9 5.1 11.3 11.3zM415.5 216.6c-5.4 5.9-18.5 10.1-29.1 9.2-10.6-0.8-14.9-6.3-9.4-12.3 5.4-5.9 18.5-10.1 29.1-9.2 10.6 0.9 14.8 6.4 9.4 12.3z"
          fill="#FFE200"
          p-id="5037"
        ></path>
        <path
          d="M498.6 798.6c-5.4 5.6-1 11.2 9.8 12.6 10.8 1.4 23.9-2 29.3-7.5 5.4-5.6 1-11.2-9.8-12.6-10.7-1.5-23.9 1.9-29.3 7.5zM634.6 797.1c-6.6 4.1-3.7 10.7 6.4 14.6 10.1 4 23.6 3.9 30.2-0.2 6.6-4.1 3.7-10.7-6.4-14.6-10-4-23.6-3.9-30.2 0.2zM593.7 847.4c8.8-5.6 9.4-12.3 1.5-15-7.9-2.6-21.5-0.2-30.2 5.5-8.8 5.6-9.4 12.3-1.5 15 7.9 2.6 21.4 0.1 30.2-5.5zM499.7 847.2c-4.6-6.2-17.2-11.2-28.1-11.2s-15.9 5.1-11.3 11.3 17.2 11.2 28.1 11.2c10.9-0.1 15.9-5.1 11.3-11.3zM415.5 816.5c-5.4-5.9-18.5-10.1-29.1-9.2-10.6 0.8-14.9 6.3-9.4 12.3 5.4 5.9 18.5 10.1 29.1 9.2s14.8-6.4 9.4-12.3z"
          fill="#FFE200"
          p-id="5038"
        ></path>
      </svg>
    );
  }
);

export default LogoSvg;