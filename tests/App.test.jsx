import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router";
import { render, screen } from "@testing-library/react";
import { App } from "../src/app/App.jsx";

describe('App', () => {
    it('renders headline', () => {
        render(<MemoryRouter>
                    <App/>
                </MemoryRouter>);
        expect(screen.getByRole('heading').textContent).toMatch(' 👹 FakeShop 👹 ')
    });
});