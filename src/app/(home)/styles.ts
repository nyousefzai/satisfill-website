"use client";

import styled from "styled-components";

export const Container = styled.div`
  background-image: url("/sky.jpg");
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 24px 100px;
  box-sizing: border-box;
  margin: 0;
  position: relative;

  /* Sun shining effect overlay covering whole page */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at center,
      rgba(255, 255, 255, 0.7) 0%,
      rgba(255, 255, 200, 0.5) 15%,
      rgba(255, 255, 150, 0.3) 30%,
      rgba(255, 255, 100, 0.15) 45%,
      rgba(255, 255, 50, 0.05) 60%,
      transparent 80%
    );
    pointer-events: none;
    z-index: 0;
    animation: sunOverlay 3s ease-in-out infinite;
  }

  @keyframes sunOverlay {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.85;
    }
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;

export const Content = styled.div`
  max-width: 700px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  z-index: 1;
`;

export const ComingSoonText = styled.h1`
  font-style: italic;
  font-weight: 800;
  font-size: 45px;
  color: #eaa446;
  text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.8);
  margin-top: 20px;

  /* @media (max-width: 768px) {
    font-size: 24px;
  } */
`;

export const LogoContainer = styled.div`
  margin-top: 50px;
  position: relative;
  padding: 40px;

  /* Sun shining effect with radial gradient */
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.95) 0%,
    rgba(255, 255, 200, 0.8) 20%,
    rgba(255, 255, 150, 0.6) 40%,
    rgba(255, 255, 100, 0.3) 60%,
    rgba(255, 255, 50, 0.1) 80%,
    transparent 100%
  );

  img {
    max-height: 100px;
    width: 100%;
    position: relative;
    z-index: 1;
    filter: brightness(1.1) contrast(1.1);
  }
`;

export const PyramidContainer = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
`;

export const PyramidSection = styled.div<{ isTop?: boolean }>`
  background-color: #fcfbab;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  clip-path: ${({ isTop }) =>
    isTop
      ? "polygon(50% 0%, 85% 100%, 15% 100%)" // triangle pointing down, base matches bottom
      : "polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)"}; // trapezoid
  width: 400px;
  margin: 0 auto;
  height: ${({ isTop }) => (isTop ? "200px" : "100px")};

  @media (max-width: 500px) {
    width: 250px;
    height: ${({ isTop }) => (isTop ? "150px" : "80px")};
    clip-path: ${({ isTop }) =>
      isTop
        ? "polygon(50% 0%, 85% 100%, 15% 100%)"
        : "polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)"};
  }
`;

export const PyramidText = styled.div`
  font-style: italic;
  font-size: 45px;
  color: #4272b4;
  text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.8);
  font-weight: bold;
  line-height: 1.2;

  @media (max-width: 500px) {
    font-size: 30px;
  }
`;

export const PyramidTextOverflow = styled.div`
  position: relative;
  width: 100%;

  ${PyramidText} {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
  }
`;
