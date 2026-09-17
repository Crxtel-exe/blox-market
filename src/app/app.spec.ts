import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the shop brand in the header', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.brand-text strong')?.textContent).toContain('RBX Emporium');
  });

  it('should render the item grid on load', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    // The grid is present and the filter bar offers all four games plus "All".
    expect(compiled.querySelector('app-item-grid')).toBeTruthy();
    expect(compiled.querySelectorAll('app-game-filter-bar .chip').length).toBe(5);
  });
});
