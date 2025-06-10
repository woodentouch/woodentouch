package com.wooden.project.service;

import com.wooden.project.model.Panier;
import com.wooden.project.model.PanierItem;
import java.util.List;

public interface PanierService extends BaseService<Panier,Long> {
    Panier createPanierWithItems(Panier panier);
    PanierItem addItem(Long panierId, PanierItem item);
    void removeItem(Long itemId);
    PanierItem updateItemQuantity(Long itemId, int quantity);
    List<PanierItem> getItems(Long panierId);
}
