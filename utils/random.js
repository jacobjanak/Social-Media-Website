const random = {
  string: len => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let text = '';

    for (let i = 0; i < len; i++) {
      text += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return text;
  }
}

module.exports = random;
