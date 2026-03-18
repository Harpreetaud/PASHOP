import {
  type CartViewPayload,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen';
import { Suspense } from 'react';
import { Await, NavLink, useAsyncValue } from 'react-router';
import type { CartApiQueryFragment, HeaderQuery } from 'storefrontapi.generated';
import { useAside } from '~/components/Aside';

interface HeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
}

type Viewport = 'desktop' | 'mobile';

export function Header({
  header,
  isLoggedIn,
  cart,
  publicStoreDomain,
}: HeaderProps) {
  const {shop, menu} = header;
  return (
    <header className="header">
      <div className="header-left">
        <HeaderMenuMobileToggle />
        <SearchToggle />
      </div>

      <div className="header-center">
        <NavLink prefetch="intent" to="/" style={activeLinkStyle} end className="header-logo-link">
          <svg width="138" height="20" viewBox="0 0 138 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M131.675 15.775H133.037V9.7C133.008 9.14893 133.096 8.59783 133.295 8.08334C133.495 7.56885 133.802 7.10277 134.196 6.7161C134.589 6.32943 135.061 6.03103 135.579 5.84074C136.097 5.65046 136.65 5.57265 137.2 5.6125V4.225C136.28 4.1559 135.363 4.3964 134.595 4.90828C133.827 5.42015 133.253 6.17401 132.962 7.05V7.05V4.375H131.712L131.675 15.775ZM121.25 9.2875C121.462 7.2 122.7 5.2125 125 5.2125C127.3 5.2125 128.487 7.1875 128.55 9.2875H121.25ZM129.85 10.45C129.962 7.25 128.6 4.05 124.937 4.05C121.275 4.05 119.937 7.075 119.937 10.075C119.937 13.325 121.425 16.1125 124.937 16.1125C127.75 16.1125 129.225 14.6125 129.812 12.025H128.45C128.338 12.8731 127.913 13.6486 127.259 14.1992C126.604 14.7498 125.767 15.0354 124.912 15C122.287 15 121.25 12.5 121.162 10.5125L129.85 10.45ZM117.825 0H116.462V6.5375C116.157 5.76965 115.619 5.11622 114.925 4.66815C114.23 4.22007 113.413 3.99963 112.587 4.0375C109.175 4.0375 107.587 6.8375 107.587 10.0625C107.587 13.2875 109.2 16.1 112.587 16.1C113.42 16.1021 114.237 15.8684 114.942 15.426C115.648 14.9836 116.214 14.3505 116.575 13.6V13.6V15.7625H117.825V0ZM108.875 10.075C108.875 7.7125 109.937 5.2125 112.537 5.2125C115.437 5.2125 116.462 7.7125 116.462 10.075C116.462 12.4375 115.437 15 112.5 15C110 15 108.875 12.5 108.875 10.075ZM96.375 15.775H97.7375V9.125C97.7375 6.8875 99.0875 5.2125 101.25 5.2125C103.412 5.2125 104.087 6.7 104.087 8.6625V15.775H105.45V8.4375C105.45 5.725 104.5 4.05 101.362 4.05C100.605 4.02553 99.8584 4.23099 99.2202 4.63933C98.5821 5.04766 98.0826 5.63971 97.7875 6.3375V6.3375V4.375H96.325L96.375 15.775ZM86.375 7.8625C86.375 6.0125 87.625 5.2125 89.3625 5.2125C91.1 5.2125 92.2875 5.675 92.2875 7.5625C92.2875 8.8125 91.6625 8.975 90.5375 9.1C87.5875 9.4625 84.525 9.575 84.525 12.775C84.525 15.075 86.225 16.1125 88.275 16.1125C89.1056 16.1585 89.9313 15.959 90.6493 15.5389C91.3673 15.1188 91.9457 14.4966 92.3125 13.75C92.3125 15 92.525 15.7375 93.9125 15.7375C94.2109 15.7488 94.5095 15.7193 94.8 15.65V14.4875C94.6593 14.5381 94.5119 14.5676 94.3625 14.575C94.2515 14.5855 94.1396 14.5708 94.0352 14.5319C93.9307 14.4929 93.8364 14.4308 93.7594 14.3502C93.6824 14.2696 93.6247 14.1726 93.5906 14.0665C93.5565 13.9604 93.5469 13.8479 93.5625 13.7375V7.7125C93.5625 4.6625 91.425 4.05 89.45 4.05C86.95 4.05 85.05 5.1875 84.925 7.8625H86.375ZM92.2875 11.3625C92.2911 11.8671 92.1894 12.3668 91.9887 12.8298C91.7881 13.2928 91.493 13.7088 91.1224 14.0512C90.7518 14.3936 90.3137 14.6548 89.8363 14.8182C89.359 14.9816 88.8527 15.0435 88.35 15C88.0369 15.022 87.7225 14.9807 87.4257 14.8786C87.1289 14.7765 86.8557 14.6157 86.6224 14.4057C86.389 14.1957 86.2004 13.9409 86.0677 13.6564C85.935 13.372 85.861 13.0637 85.85 12.75C85.85 10.5125 88.725 10.5375 91.05 10.1125C91.4125 10.1125 92.025 9.9375 92.2 9.6125L92.2875 11.3625ZM73.4 15.775H75.0875L78.5375 10.9875L82.0375 15.775H83.75L79.425 9.8375L83.45 4.375H81.7375L78.625 8.75L75.4375 4.375H73.75L77.7625 9.85L73.4 15.775ZM64.225 9.2875C64.45 7.2 65.6875 5.2125 67.9125 5.2125C70.1375 5.2125 71.4 7.1875 71.475 9.2875H64.225ZM72.8375 10.45C72.9375 7.25 71.5125 4.05 67.9125 4.05C64.3125 4.05 62.9125 7.075 62.9125 10.075C62.9125 13.325 64.4125 16.1125 67.9125 16.1125C70.7375 16.1125 72.2 14.6125 72.7875 12.025H71.425C71.3137 12.8686 70.8923 13.6406 70.243 14.1905C69.5937 14.7405 68.7629 15.0291 67.9125 15C65.2875 15 64.25 12.5 64.225 10.5125L72.8375 10.45ZM59.4375 15.775H60.8V0H59.4375V15.775ZM49.4375 7.8625C49.43 7.48174 49.5054 7.10389 49.6585 6.75519C49.8116 6.40648 50.0387 6.09526 50.3241 5.84314C50.6096 5.59101 50.9464 5.404 51.3114 5.29511C51.6763 5.18621 52.0606 5.15802 52.4375 5.2125C54.0375 5.2125 55.3625 5.675 55.3625 7.5625C55.3625 8.8125 54.7375 8.975 53.6125 9.1C50.6625 9.4625 47.6 9.575 47.6 12.775C47.6 15.075 49.2875 16.1125 51.35 16.1125C52.1806 16.1585 53.0063 15.959 53.7243 15.5389C54.4423 15.1188 55.0207 14.4966 55.3875 13.75V13.75C55.3875 15 55.6 15.7375 56.9875 15.7375C57.2859 15.7488 57.5845 15.7193 57.875 15.65V14.4875C57.7343 14.5381 57.5869 14.5676 57.4375 14.575C57.3265 14.5855 57.2146 14.5708 57.1102 14.5319C57.0057 14.4929 56.9114 14.4308 56.8344 14.3502C56.7574 14.2696 56.6997 14.1726 56.6656 14.0665C56.6315 13.9604 56.6219 13.8479 56.6375 13.7375V7.7125C56.6375 4.6625 54.5 4.05 52.525 4.05C49.9625 4.05 48.125 5.1875 47.9875 7.8625H49.4375ZM55.3625 11.3625C55.3661 11.8671 55.2644 12.3668 55.0637 12.8298C54.8631 13.2928 54.568 13.7088 54.1974 14.0512C53.8268 14.3936 53.3887 14.6548 52.9114 14.8182C52.434 14.9816 51.9277 15.0435 51.425 15C51.1123 15.0203 50.7986 14.9778 50.5026 14.875C50.2065 14.7722 49.934 14.6113 49.701 14.4017C49.4681 14.192 49.2794 13.9379 49.1461 13.6542C49.0129 13.3706 48.9377 13.0631 48.925 12.75C48.925 10.5125 51.8125 10.5375 54.1375 10.1125C54.5 10.1125 55.1125 9.9375 55.2875 9.6125L55.3625 11.3625Z" fill="#EC008C"/>
<path d="M41.35 15.775H42.7125V9.7C42.6827 9.14893 42.7705 8.59782 42.9702 8.08334C43.1698 7.56885 43.4768 7.10277 43.8705 6.7161C44.2643 6.32943 44.7359 6.03103 45.2539 5.84074C45.7719 5.65046 46.3246 5.57265 46.875 5.6125V4.225C45.9561 4.15434 45.04 4.39442 44.2739 4.9067C43.5077 5.41899 42.9358 6.17379 42.65 7.05V7.05V4.375H41.4L41.35 15.775ZM30.9 9.2875C31.1125 7.2 32.35 5.2125 34.65 5.2125C36.95 5.2125 38.1375 7.1875 38.2 9.2875H30.9ZM39.5 10.45C39.6125 7.25 38.1875 4.05 34.5875 4.05C30.9875 4.05 29.5875 7.075 29.5875 10.075C29.5875 13.325 31.075 16.1125 34.5875 16.1125C37.4 16.1125 38.875 14.6125 39.4625 12.025H38.1C37.9887 12.8686 37.5673 13.6406 36.918 14.1905C36.2687 14.7405 35.4379 15.029 34.5875 15C31.9625 15 30.925 12.5 30.8375 10.5125L39.5 10.45ZM25.85 0.949997H24.4875V4.375H22.5V5.55H24.45V13.35C24.45 15.2875 25.05 15.9125 26.875 15.9125C27.2875 15.9125 27.675 15.9125 28.125 15.9125V14.725C27.7337 14.7502 27.3413 14.7502 26.95 14.725C25.975 14.725 25.85 14.1375 25.85 13.225V5.55H28.125V4.375H25.85V0.949997ZM13.2375 9.2875C13.45 7.2 14.6875 5.2125 16.925 5.2125C19.1625 5.2125 20.4125 7.1875 20.475 9.2875H13.2375ZM21.8375 10.45C21.95 7.25 20.5875 4.05 16.925 4.05C13.2625 4.05 11.925 7.075 11.925 10.075C11.925 13.325 13.4125 16.1125 16.925 16.1125C19.7375 16.1125 21.2125 14.6125 21.8 12.025H20.4375C20.3262 12.8686 19.9048 13.6406 19.2555 14.1905C18.6062 14.7405 17.7754 15.029 16.925 15C14.3 15 13.2625 12.5 13.2375 10.5125L21.8375 10.45ZM0 20H1.3625V13.6125C1.67058 14.3813 2.21043 15.0352 2.90709 15.4832C3.60375 15.9312 4.42262 16.1512 5.25 16.1125C8.65 16.1125 10.25 13.3 10.25 10.075C10.25 6.85 8.75 4.05 5.2875 4.05C4.44131 4.00435 3.60135 4.21805 2.87987 4.66256C2.15839 5.10706 1.58977 5.76118 1.25 6.5375V4.375H0V20ZM8.95 10.075C8.95 12.5 7.8875 15 5.2875 15C2.3875 15 1.3625 12.5 1.3625 10.1375C1.3625 7.55 2.275 5.275 5.2875 5.275C7.8875 5.275 8.95 7.775 8.95 10.1375" fill="#EC008C"/>
</svg>
          {/* Logo SVG goes here */}
        </NavLink>
      </div>

      <div className="header-right">
        <HeaderMenu
          menu={menu}
          viewport="desktop"
          primaryDomainUrl={header.shop.primaryDomain.url}
          publicStoreDomain={publicStoreDomain}
        />
        <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
      </div>
    </header>
  );
}

export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
}: {
  menu: HeaderProps['header']['menu'];
  primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
  viewport: Viewport;
  publicStoreDomain: HeaderProps['publicStoreDomain'];
}) {
  const className = `header-menu-${viewport}`;
  const {close} = useAside();

  return (
    <nav className={className} role="navigation">
      {viewport === 'mobile' && (
        <NavLink
          end
          onClick={close}
          prefetch="intent"
          style={activeLinkStyle}
          to="/"
        >
          Home
        </NavLink>
      )}
      {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
        if (!item.url) return null;

        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        return (
          <NavLink
            className="header-menu-item"
            end
            key={item.id}
            onClick={close}
            prefetch="intent"
            style={activeLinkStyle}
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

function HeaderCtas({
  isLoggedIn,
  cart,
}: Pick<HeaderProps, 'isLoggedIn' | 'cart'>) {
  return (
    <nav className="header-ctas" role="navigation">
      <NavLink prefetch="intent" to="/account" className="header-cta-icon" aria-label="Account">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      </NavLink>
      <a href="#" className="header-cta-icon" aria-label="Wishlist">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      </a>
      <CartToggle cart={cart} />
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  const {open} = useAside();
  return (
    <button
      className="header-menu-mobile-toggle reset"
      onClick={() => open('mobile')}
    >
      <h3>☰</h3>
    </button>
  );
}

function SearchToggle() {
  const {open} = useAside();
  return (
    <button className="reset search-toggle-btn" onClick={() => open('search')}>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      <span className="search-text">Search</span>
    </button>
  );
}

function CartBadge({count}: {count: number | null}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();

  return (
    <a
      href="/cart"
      className="header-cta-icon cart-icon-wrapper"
      aria-label="Cart"
      onClick={(e) => {
        e.preventDefault();
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        } as CartViewPayload);
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
      {count !== null && count > 0 && <span className="cart-badge-count">{count}</span>}
    </a>
  );
}

function CartToggle({cart}: Pick<HeaderProps, 'cart'>) {
  return (
    <Suspense fallback={<CartBadge count={null} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  );
}

function CartBanner() {
  const originalCart = useAsyncValue() as CartApiQueryFragment | null;
  const cart = useOptimisticCart(originalCart);
  return <CartBadge count={cart?.totalQuantity ?? 0} />;
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'Collections',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Blog',
      type: 'HTTP',
      url: '/blogs/journal',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Policies',
      type: 'HTTP',
      url: '/policies',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'About',
      type: 'PAGE',
      url: '/pages/about',
      items: [],
    },
  ],
};

function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'black',
  };
}
