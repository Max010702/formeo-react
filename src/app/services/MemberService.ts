import axios from "axios";

import { serverApi } from "../lib/config";
import type { LoginInput, Member, MemberInput } from "../lib/types/member";

interface AuthenticationResponse {
  member: Member;
}

class MemberService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async getTopUsers(): Promise<Member[]> {
    try {
      const response = await axios.get<Member[]>(
        `${this.path}/member/top-users`,
      );

      console.log("getTopUsers:", response.data);

      return response.data;
    } catch (error) {
      console.error("Error, getTopUsers:", error);
      throw error;
    }
  }

  public async getRestaurant(): Promise<Member> {
    try {
      const response = await axios.get<Member>(
        `${this.path}/member/restaurant`,
      );

      console.log("getRestaurant:", response.data);

      return response.data;
    } catch (error) {
      console.error("Error, getRestaurant:", error);
      throw error;
    }
  }

  public async signup(input: MemberInput): Promise<Member> {
    try {
      const response = await axios.post<AuthenticationResponse>(
        `${this.path}/member/signup`,
        input,
        {
          withCredentials: true,
        },
      );

      const member = response.data.member;

      localStorage.setItem("memberData", JSON.stringify(member));

      console.log("signup member:", member);

      return member;
    } catch (error) {
      console.error("Error, signup:", error);
      throw error;
    }
  }

  public async login(input: LoginInput): Promise<Member> {
    try {
      const response = await axios.post<AuthenticationResponse>(
        `${this.path}/member/login`,
        input,
        {
          withCredentials: true,
        },
      );

      const member = response.data.member;

      localStorage.setItem("memberData", JSON.stringify(member));

      console.log("login member:", member);

      return member;
    } catch (error) {
      console.error("Error, login:", error);
      throw error;
    }
  }

  public async logout(): Promise<void> {
    try {
      await axios.post(
        `${this.path}/member/logout`,
        {},
        {
          withCredentials: true,
        },
      );

      localStorage.removeItem("memberData");

      console.log("logout successful");
    } catch (error) {
      console.error("Error, logout:", error);
      throw error;
    }
  }
}

export default MemberService;
