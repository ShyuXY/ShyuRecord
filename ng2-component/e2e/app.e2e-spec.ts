import { SteelAdminNg2Page } from './app.po';

describe('steel-admin-ng2 App', function() {
  let page: SteelAdminNg2Page;

  beforeEach(() => {
    page = new SteelAdminNg2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
