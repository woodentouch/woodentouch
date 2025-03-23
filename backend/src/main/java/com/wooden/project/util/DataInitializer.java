package com.wooden.project.util;

import com.wooden.project.model.*;
import com.wooden.project.service.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;

@Component
public class DataInitializer implements CommandLineRunner {
    private final LicenceService licenceService;
    private final StockService stockService;
    private final ProductService productService;
    private final EventService eventService;
    private final UserService userService;
    private final PanierService panierService;
    private final VenteService venteService;

    public DataInitializer(LicenceService licenceService, StockService stockService, ProductService productService, EventService eventService, UserService userService, PanierService panierService, VenteService venteService) {
        this.licenceService = licenceService;
        this.stockService = stockService;
        this.productService = productService;
        this.eventService = eventService;
        this.userService = userService;
        this.panierService = panierService;
        this.venteService = venteService;
    }
    @Override
    public void run(String... args) throws Exception {
        // Add your data initialization here
        System.out.println("Data initialization...");
        User user1 = new User("Abdou","Sofi@1.com","test");
        User user2 = new User("Ali","AA@gmail.cc","test");
        licence licence1 = new licence("Naruto");
        licence licence2 = new licence("One Piece");
        userService.save(user1);
        userService.save(user2);
        licenceService.save(licence1);
        licenceService.save(licence2);
        Produit produit1 = new Produit(licence1,user1, Taille.M,"Tableau Naruto");
        Produit produit2 = new Produit(licence2,user2, Taille.L,"Tableau One Piece");
        productService.save(produit1);
        productService.save(produit2);
        Stock stock1 = new Stock(produit1, 10);
        Stock stock2 = new Stock(produit2, 20);
        stockService.save(stock1);
        stockService.save(stock2);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date startDate = sdf.parse("2021-12-12");
        Date endDate = sdf.parse("2021-12-13");
        evenement event1 = new evenement("Naruto", startDate, endDate);
        eventService.save(event1);
        Panier panier1 = new Panier(produit1,startDate);
        Panier panier2 = new Panier(produit2,startDate);
        panierService.save(panier1);
        panierService.save(panier2);
        Ventes vente1 = new Ventes(produit1,user1,10.2,"cash",startDate,event1);
        Ventes vente2 = new Ventes(produit2,user2,20.2,"cash",startDate,event1);
        venteService.save(vente1);
        venteService.save(vente2);
    }
}
