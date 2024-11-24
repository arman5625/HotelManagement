export {default} from "next-auth/middleware"

export const config ={
    // matcher: ["/users/:path*", "/api/:path*"],
    matcher: ["/users/:path*"],

}