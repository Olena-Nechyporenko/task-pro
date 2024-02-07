import Logo from "../../components/Logo/Logo";

import {
  WelcomeWrapper,
  WelcomeContainer,
  WelcomeText,
  WelcomeBtnWrapper,
  RegistrationBtn,
  LoginBtn,
} from "./Welcome.styled";

const size = {
  width: "48px",
  height: "48px",
};

const text = {
  color: "#161616",
  font: "4rem",
};

const icon = {
  bgColor: "#161616",
  iconColor: "#fff",
};

export default function Welcome() {
  return (
    <WelcomeContainer>
      <WelcomeWrapper>
        <img src="images/welcome.png" alt="boy with laptop" />
        <Logo size={size} text={text} icon={icon} />
        <WelcomeText>
          Supercharge your productivity and take control of your tasks with Task
          Pro - Don't wait, start achieving your goals now!
        </WelcomeText>
        <WelcomeBtnWrapper>
          <RegistrationBtn to="auth/signup">Registration</RegistrationBtn>
          <LoginBtn to="auth/signin">Log In</LoginBtn>
        </WelcomeBtnWrapper>
      </WelcomeWrapper>
    </WelcomeContainer>
  );
}

