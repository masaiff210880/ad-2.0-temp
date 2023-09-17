import React from 'react';
import style from "../../styles/productItem.module.css"

const ShopBreadcrumb = ({title,subtitle}) => {
  return (
    <>
      <section className="breadcrumb__area include-bg pt-100 pb-50">
        <div className="container">
          <div className="row">
            <div className="col-xxl-12">
              <div className="breadcrumb__content p-relative z-index-1">
                <h3 className={`${'breadcrumb__title'} ${style.mainTitle}`}>{title}</h3>
                <div className="breadcrumb__list">
                  <span className={style.shopHomeCss}><a href="#">Home</a></span>
                  <span className={style.subTitle}>{subtitle}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopBreadcrumb;