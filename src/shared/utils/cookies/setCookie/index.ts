function setCookie(
  key: string,
  value: string | boolean | number | undefined | null,
  options?: {
    expireDays?: number;
    SameSite?: 'Strict' | 'None' | 'Lax';
    Secure?: boolean;
    HttpOnly?: boolean;
    path?: string;
  }
) {
  if (document) {
    const { expireDays = 1, SameSite, Secure = true, HttpOnly = true, path } =
      options || {};
    let newCookie = key + '=' + value;

    if (typeof key !== 'string' || key.length < 2) {
      throw new Error('Cookie key must have atleast 2 characters;');
    } else if (expireDays <= 0) {
      throw new Error('Cookie expires must have a future date;');
    } else if (path && (typeof path !== 'string' || path?.[0] !== '/')) {
      throw new Error('Cookie path must have a valid value;');
    }

    const getDate = (days: number) => {
      const d = new Date();
      d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
      return ';expires=' + d.toUTCString();
    };
    if (!value && value !== false) {
      newCookie += getDate(-4);
    } else {
      newCookie += getDate(expireDays);
    }

    newCookie += ';path=' + (path || '/');

    const getSameSite = () => {
      switch (SameSite) {
        case 'Lax':
          return 'Lax';
        case 'None':
          return 'None';
        default:
          return 'Strict';
      }
    };

    newCookie += ';SameSite=' + getSameSite();

    if (Secure) {
      newCookie += ';Secure';
    }

    if (HttpOnly) {
      newCookie += ';HttpOnly';
    }

    document.cookie = newCookie;
  }
}

export default setCookie;
