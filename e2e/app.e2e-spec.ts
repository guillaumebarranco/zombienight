import { ZombiePage } from './app.po';

describe('zombie App', function() {
  let page: ZombiePage;

  beforeEach(() => {
    page = new ZombiePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
