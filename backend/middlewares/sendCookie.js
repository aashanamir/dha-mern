export const sendCookie = (user, res, statusCode, msg) => {

  const token = user.getJwtToken();

  if (msg !== undefined) {
    res.status(statusCode).cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
    }).json({
      success: true,
      user,
      message: msg,
    })
  } else {
    res.status(statusCode).cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
    }).json({
      success: true,
      user,
    })
  }



}