export const demoCollections = {
  companies: [
    { companyCode: 'FPT', legalName: 'Công ty Cổ phần FPT', industryName: 'Công nghệ thông tin', listingStatus: 'LISTED', isActive: true, updatedAt: '2026-09-15T08:30:00Z' },
    { companyCode: 'VNM', legalName: 'Công ty Cổ phần Sữa Việt Nam', industryName: 'Thực phẩm và đồ uống', listingStatus: 'LISTED', isActive: true, updatedAt: '2026-09-15T08:28:00Z' },
    { companyCode: 'VCB', legalName: 'Ngân hàng TMCP Ngoại thương Việt Nam', industryName: 'Ngân hàng', listingStatus: 'LISTED', isActive: true, updatedAt: '2026-09-15T08:25:00Z' },
    { companyCode: 'HPG', legalName: 'Công ty Cổ phần Tập đoàn Hòa Phát', industryName: 'Thép', listingStatus: 'LISTED', isActive: true, updatedAt: '2026-09-15T08:22:00Z' },
  ],
  securities: [
    { symbol: 'FPT', exchange: 'HOSE', securityType: 'STOCK', currency: 'VND', closePrice: 102500, change: 1.28, qualityStatus: 'VALID' },
    { symbol: 'VNM', exchange: 'HOSE', securityType: 'STOCK', currency: 'VND', closePrice: 67800, change: -0.44, qualityStatus: 'VALID' },
    { symbol: 'VCB', exchange: 'HOSE', securityType: 'STOCK', currency: 'VND', closePrice: 64800, change: 0.62, qualityStatus: 'WARNING' },
    { symbol: 'HPG', exchange: 'HOSE', securityType: 'STOCK', currency: 'VND', closePrice: 27600, change: 2.03, qualityStatus: 'VALID' },
  ],
  sources: [
    { code: 'VNSTOCK', name: 'VnStock Adapter', sourceType: 'LIBRARY', priority: 10, licenseStatus: 'UNKNOWN', isActive: true, lastSync: '2 phút trước' },
    { code: 'HOSE', name: 'Sở GDCK TP.HCM', sourceType: 'WEB', priority: 1, licenseStatus: 'RESTRICTED', isActive: true, lastSync: '18 phút trước' },
    { code: 'WORLD_BANK', name: 'World Bank Open Data', sourceType: 'API', priority: 20, licenseStatus: 'FREE', isActive: true, lastSync: '1 ngày trước' },
  ],
  ingestions: [
    { code: 'PRICE_FPT_15M', status: 'SUCCESS', triggerType: 'SCHEDULED', fetchedCount: 384, insertedCount: 378, rejectedCount: 6, duration: '12.4s', startedAt: '09:30:00' },
    { code: 'NEWS_MARKET', status: 'RUNNING', triggerType: 'SCHEDULED', fetchedCount: 126, insertedCount: 111, rejectedCount: 3, duration: '08.9s', startedAt: '09:25:00' },
    { code: 'FIN_STATEMENT_Q2', status: 'PARTIAL_SUCCESS', triggerType: 'MANUAL', fetchedCount: 48, insertedCount: 42, rejectedCount: 6, duration: '34.7s', startedAt: '09:12:00' },
    { code: 'MACRO_MONTHLY', status: 'FAILED', triggerType: 'RETRY', fetchedCount: 0, insertedCount: 0, rejectedCount: 0, duration: '05.1s', startedAt: '08:50:00' },
  ],
  validations: [
    { rule: 'PRICE_OHLC_RANGE', domain: 'MARKET_PRICE', status: 'PASS', severity: 'ERROR', entityKey: 'FPT:2026-09-15T09:30', checkedAt: '09:30:13' },
    { rule: 'NEWS_REQUIRED_FIELDS', domain: 'NEWS', status: 'PASS', severity: 'CRITICAL', entityKey: 'news:2b51', checkedAt: '09:26:02' },
    { rule: 'FIN_STATEMENT_BALANCE', domain: 'FINANCIAL_STATEMENT', status: 'FAIL', severity: 'CRITICAL', entityKey: 'VCB:2026Q2', checkedAt: '09:13:08' },
    { rule: 'SOURCE_FRESHNESS', domain: 'MACRO', status: 'FAIL', severity: 'WARNING', entityKey: 'VN.CPI.MONTHLY', checkedAt: '08:55:11' },
  ],
}
