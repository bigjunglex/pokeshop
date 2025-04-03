import { describe, it, expect, beforeEach, vi } from "vitest";
import { createBrowserRouter, RouterProvider} from "react-router";
import { render, screen } from "@testing-library/react";
import { appRoutes } from "../src/routes.jsx";
import { Shop } from "../src/app/shop/Shop.jsx";
import userEvent from "@testing-library/user-event";


describe('spa navigation, walkthrough pages', () => {
    const router = createBrowserRouter(appRoutes)
    const user = userEvent.setup();
    
    beforeEach(() => {
        render(<RouterProvider router={router}/>);
    })
    
    it('header', () => expect(screen.getByTestId('logo').textContent).toMatch(' 👹 FakeShop 👹 '))
    it('cart', async () => {
        await user.click(screen.getByTestId('cart-link'))
        expect(screen.getByText(/total/i)).toBeInTheDocument()
    })
    it('home', async () => {
        await user.click(screen.getByTestId('home-link'))
        expect(screen.getByTestId('greet')).toBeInTheDocument()
    })    
    it('shop', async () => {
        await user.click(screen.getByTestId('shop-link'))
        expect(screen.getByTestId('shop')).toBeInTheDocument()
    })
}) 

