import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router";
import { render, screen } from "@testing-library/react";
import { App } from "../src/app/App.jsx";
import { Shop } from "../src/app/shop/Shop.jsx";

describe('App', () => {
    it('renders headline', () => {
        render(<MemoryRouter>
                    <App />
                </MemoryRouter>);
        expect(screen.getByTestId('logo').textContent).toMatch(' 👹 FakeShop 👹 ')
    });
});