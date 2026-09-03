import axios from "axios";
import { serverApi } from "../lib/config";
import type { LoginInput, Member, MemberInput } from "../lib/types/member";

class MemberService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async signup(input: MemberInput): Promise<Member> {
    const response = await axios.post<Member>(
      `${this.path}/member/signup`,
      input,
      { withCredentials: true },
    );

    return response.data;
  }

  public async login(input: LoginInput): Promise<Member> {
    const response = await axios.post<Member>(
      `${this.path}/member/login`,
      input,
      { withCredentials: true },
    );

    return response.data;
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
}

export default MemberService;
