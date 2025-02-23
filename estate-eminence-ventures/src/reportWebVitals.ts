import { ReportHandler } from 'web-vitals';

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Measure Cumulative Layout Shift (CLS)
      getCLS(onPerfEntry);

      // Measure First Input Delay (FID)
      getFID(onPerfEntry);

      // Measure First Contentful Paint (FCP)
      getFCP(onPerfEntry);

      // Measure Largest Contentful Paint (LCP)
      getLCP(onPerfEntry);

      // Measure Time to First Byte (TTFB)
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;