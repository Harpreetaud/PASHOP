import {Money} from '@shopify/hydrogen';
import type {MoneyV2} from '@shopify/hydrogen/storefront-api-types';

export function ProductPrice({
  price,
  compareAtPrice,
}: {
  price?: MoneyV2;
  compareAtPrice?: MoneyV2 | null;
}) {
  return (
    <div className="product-price">
  {/* Rewards Section */}
  {price?.amount && (
    <p className="rewards-text">
      Peter's Dreamers Rewards You could earn {Math.floor(parseFloat(price.amount))} Points. 
      <a href="/account/login"> Sign In</a> or <a href="/account/register"> Join</a>
    </p>
  )}

  {/* Existing Price Logic */}
  {compareAtPrice ? (
    <div className="product-price-on-sale">
      {price ? <Money data={price} /> : null}
      <s>
        <Money data={compareAtPrice} />
      </s>
    </div>
  ) : price ? (
    <Money data={price} />
  ) : (
    <span>&nbsp;</span>
  )}
</div>
  );
}
