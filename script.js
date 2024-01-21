const btn = document.querySelector('.btn');
const ratingError = document.querySelector('.rating-error');
const ratings = document.querySelectorAll('.rating');
const textarea = document.querySelector('.comment');
const stars = document.querySelector('.rating__items');
const starsValue = document.querySelectorAll('.rating');
const post = document.querySelector('.rating__box');
const ratingItemText = document.querySelector('.rating__item_text');


if(ratings.length > 0) {
	console.log('initRatings');
    initRatings();
}
function initRatings() {
    let ratingActive, ratingValue;
    for (let index = 0; index < ratings.length; index++) {
        const rating = ratings[index];
        initRating(rating);
    }
	
    function initRating(rating) {
        initRatingVars(rating);

        setRatingActiveWidth();

        if (rating.classList.contains('rating_set')) {
            setRating(rating);
        }
    }

    function initRatingVars(rating) {
        ratingActive = rating.querySelector('.rating__active');
        ratingValue = rating.querySelector('.rating__value');
    }

    function setRatingActiveWidth(index = ratingValue.innerHTML) {
        const ratingActiveWidth = index / 0.05;
        ratingActive.style.width = `${ratingActiveWidth}%`;
    }

    function setRating(rating) {
        const ratingItems = rating.querySelectorAll('.rating__item');
		        
		for (let index = 0; index < ratingItems.length; index++) {
            const ratingItem = ratingItems[index];

            ratingItem.addEventListener("mouseenter", function (e) {
                initRatingVars(rating);
                setRatingActiveWidth(ratingItem.value);
            });

            ratingItem.addEventListener("mouseleave", function (e) {
                setRatingActiveWidth();
            });

 
            const ratingMessages = { // Вариант вывода текста под оценочными звезддочками 
                1:"Хуже, чем можно было бы себе представить",
                2:"Плохо, понравился только зоопарк",
                3:"Неплохо, кроме зоопарка неплохие стихи",
                4:"Хорошо, завтрак в воде отлично освежает",
                5:"Отлично, ставлю все цифры!",
            }

            ratingItem.addEventListener("click", function (e) {
                initRatingVars(rating);

                if (rating.dataset.ajax) {
					console.log('ajax');
                    setRatingValue(ratingItem.value, rating);
                } else {
                    ratingValue.innerHTML = index + 1;
                    setRatingActiveWidth();

                    ratingItemText.innerHTML = ratingMessages[index + 1]; 

                    console.log(ratingValue.textContent);
                }

                

                    btn.onclick = () => {
                        if(textarea.value.length < 10) {
                            ratingError.style.display = 'block';
                        } else {
                            ratingError.style.display = 'none';
                            stars.style.display = 'none';
                            post.style.display = 'block';
                            console.log(textarea.value);
                            
                            const review = {
                                rating: ratingValue.textContent,
                                comment: textarea.value
                            }
                            console.log(review);
                        }
                        return false;
                    }

            });
            console.log(setRatingActiveWidth);
        }
    }
};