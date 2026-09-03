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
      const url = `${this.path}/member/top-users`;

      const response = await axios.get<Member[]>(url);

      console.log("getTopUsers:", response.data);

      return response.data;
    } catch (error) {
      console.error("Error, getTopUsers:", error);
      throw error;
    }
  }

  public async getRestaurant(): Promise<Member> {
    try {
      const url = `${this.path}/member/restaurant`;

      const response = await axios.get<Member>(url);

      console.log("getRestaurant:", response.data);

      return response.data;
    } catch (error) {
      console.error("Error, getRestaurant:", error);
      throw error;
    }
  }

  public async signup(input: MemberInput): Promise<Member> {
    try {
      const url = `${this.path}/member/signup`;

      const response = await axios.post<AuthenticationResponse>(url, input, {
        withCredentials: true,
      });

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
      const url = `${this.path}/member/login`;

      const response = await axios.post<AuthenticationResponse>(url, input, {
        withCredentials: true,
      });

      const member = response.data.member;

      localStorage.setItem("memberData", JSON.stringify(member));

      console.log("login member:", member);

      return member;
    } catch (error) {
      console.error("Error, login:", error);
      throw error;
    }
  }
}

export default MemberService;
