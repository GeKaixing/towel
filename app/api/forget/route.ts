import { USERS } from "@/models/db";
export async function POST(res: Request) {
  try {
    const { userid, oldPassword, newPassword, confirmPassword } =
      await res.json();
    if (!userid) {
      return Response.json({ message: "参数有错误" }, { status: 401 });
    }
    const user = await USERS.findOne({ _id: userid });
    if (!user) {
      return Response.json({ message: "用户不存在" }, { status: 401 });
    }
    if (newPassword !== confirmPassword) {
      return Response.json({ message: "新密码和确认密码不匹配" }, { status: 400 });
    }
    if (oldPassword !== user.password) {
      return Response.json({ message: "旧密码不正确" }, { status: 400 });
    }
    await USERS.updateOne(
      { _id: userid },
      {
        $set: {
          password: newPassword,
        },
      }
    );
    return Response.json({ message: '修改成功' }, { status: 200 });
  } catch (error) {
    return Response.json({ message: error }, { status: 500 });
  }
}
