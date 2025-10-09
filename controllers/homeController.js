

class HomeController {
    homeView(req, res) {
        res.render('home/home');
    }
    shopView(req, res) {
        res.render('shop/shop');
    }
    aboutView(req, res) {
        res.render('home/about');
    }
    blogView(req, res) {
        res.render('home/blog');
    }
    cartView(req, res) {
        res.render('shop/cart');
    }
    contactView(req, res) {
        res.render('home/contact');
    }
}
module.exports = HomeController;