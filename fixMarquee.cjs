const fs = require('fs');

const file = 'src/pages/Home.jsx';
let content = fs.readFileSync(file, 'utf-8');

const regex = /<div className="w-full inline-flex flex-nowrap overflow-hidden[^>]*>[\s\S]*?<\/div>\s*<\/motion\.section>/;

const newMarquee = `<div className="w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
  <div className="flex w-max animate-marquee items-center gap-16 opacity-90">
    <div className="flex items-center gap-16 pr-16 justify-around">
      <img className="h-8 md:h-10 opacity-70 hover:opacity-100 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYTxAOTuHlfbXzyIbIVY_rjaDTigxLY_D_I10j9U3X4m26l1kq_bxtwijw7N0wtragCAXelX3FE0LEorlndEE-ER-5tYOGD0GVt_7nemZXJbLG20FqGA9fpGN4_YKoAa675JHsoS2wswhpKywmoE-Bf0w5ti-D9eSKrIZ2zQpaBFaK5Ld6V_3rfQKipi_xFf72Wq9aqAggKk9sKqJ3kWTYrzp-g99UQ5ds0Vr_BJlIWO4_8pXyR79UeMCE_iTaNgKVnrykKNUcAzE"/>
      <img className="h-10 md:h-12 opacity-70 hover:opacity-100 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLnBgYBepRYL251refLfGV_kdBfsh5MwTfQEHQ5MVWZ4NAQGPWFzG7x4F2lzUYqvXCCMOvIqHGP0j4yjjdNnAtLz-HmRC4XVISJjfUqG7UGpc9DMJdxaAMMiMDxgvcZUh0Bf8X-vhwUlhD8JVEH47UJyKiWG1rKUjVNDyJ4kwQyg6nX_Sc1xMXAkXbBhoDwbVs0QY8NOTiUORlaiyFBgXtslsyOnsMlfMciReXeMQW4l4PBDFuidAN_2mbpXXllTHcHAhsCAQTUMo"/>
      <img className="h-8 md:h-10 opacity-70 hover:opacity-100 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-cL-aNT0CdjGFF8oflsIEip82k_kJtgWPkRQmj7zJFDMdVosFwQA9v8Be4PzBg57udDNPeap3tzcwmzxtxMHZQfvhL66n5LVCLTXg3lZZ8ZzOtzm_XqZHYdooSpN0N7eGZiFfQ5cQWpKkYYhISz7XtiEKjnzd7yt79E_mytR_SqbJgLnd2CcWYHdV2jlKUYA14jxNk6DqCpcOb69T6ZkUp5gEgcMl6j94HHtUa2_ff4azVzQT9eww-D2UuByj9RgQSfHpWHRvNUU"/>
      <img className="h-10 md:h-12 opacity-70 hover:opacity-100 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDN8fZOaGA3wTkBMmUZZtOjG3O6G-pQnw2cwO4iGgAvNLAP95hJyrmZjQjHuWWHGlSAsThjbwlSD7cNvaLuQCY3ESxy_nWp5hrGFFnT4NB3eOq8vbsml8TgNP1R_c9kvEAQ8RlPOljP2OMgFX3rQXer85chQMlxYHZwOSbkEOcqZY8tymgvHrBlE-1-N0TiK7CMpPbdNQEvSJiyDk6sE2I9A6oDBof2o6-650iRzeUJbOwYQVZ_J9V-ZmFumJsqV94rua9qs4VXrlk"/>
      <img className="h-8 md:h-10 opacity-70 hover:opacity-100 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-e3qASJZ-NAFj-LIPY5uwyk1rThl188NUgCPYdBrT0eigQN2ThoCl3MdH0ZNefqU1TNyGK3Vsi3lN9-cfgM7LGfJFY7AmqfVfdxiYYzkyj-Xm70oC-ekKURCZLzLeZscR17NdZoOS7R2yYn4Dby0z58xkc-7yl_gihu9Ip6oG7d5opDhyhXCIpazc7kXZ0vHttx76c8oMNU2-5dJciR2Gv-hcKOlP51GOr2RSEYuIMFJz1vZE7CvYQKVOiaAbTvKZQYSr-WxL6vw"/>
      <img className="h-10 md:h-12 opacity-70 hover:opacity-100 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAC2WH9PknwbE8Bn7ud4V2l7_i5GnsPA8oXGLQf9abaVvOy3RRyLAZdU5Vt5gU-GBE9xx4qYeF7bC0_B8Ie1jDr7-JZAS6fC0ELr5y-26xzsbS9TmgVxhwnma8FF-nC6GgjbeGfkO6fJX1q_FNXAsGuBVsyir7waWEn7vkvQ3xYvVwBW-WyoHMJH6Km4hfydNfvvs3rhvjnTtCY1LpdXqvkYv81fGMOrAd4cqKQUdYIVeWlCcPEl6o_qo4sA1nUPZ5HFFTQ-fcQCg0"/>
    </div>
    <div className="flex items-center gap-16 pr-16 justify-around">
      <img className="h-8 md:h-10 opacity-70 hover:opacity-100 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYTxAOTuHlfbXzyIbIVY_rjaDTigxLY_D_I10j9U3X4m26l1kq_bxtwijw7N0wtragCAXelX3FE0LEorlndEE-ER-5tYOGD0GVt_7nemZXJbLG20FqGA9fpGN4_YKoAa675JHsoS2wswhpKywmoE-Bf0w5ti-D9eSKrIZ2zQpaBFaK5Ld6V_3rfQKipi_xFf72Wq9aqAggKk9sKqJ3kWTYrzp-g99UQ5ds0Vr_BJlIWO4_8pXyR79UeMCE_iTaNgKVnrykKNUcAzE"/>
      <img className="h-10 md:h-12 opacity-70 hover:opacity-100 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLnBgYBepRYL251refLfGV_kdBfsh5MwTfQEHQ5MVWZ4NAQGPWFzG7x4F2lzUYqvXCCMOvIqHGP0j4yjjdNnAtLz-HmRC4XVISJjfUqG7UGpc9DMJdxaAMMiMDxgvcZUh0Bf8X-vhwUlhD8JVEH47UJyKiWG1rKUjVNDyJ4kwQyg6nX_Sc1xMXAkXbBhoDwbVs0QY8NOTiUORlaiyFBgXtslsyOnsMlfMciReXeMQW4l4PBDFuidAN_2mbpXXllTHcHAhsCAQTUMo"/>
      <img className="h-8 md:h-10 opacity-70 hover:opacity-100 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-cL-aNT0CdjGFF8oflsIEip82k_kJtgWPkRQmj7zJFDMdVosFwQA9v8Be4PzBg57udDNPeap3tzcwmzxtxMHZQfvhL66n5LVCLTXg3lZZ8ZzOtzm_XqZHYdooSpN0N7eGZiFfQ5cQWpKkYYhISz7XtiEKjnzd7yt79E_mytR_SqbJgLnd2CcWYHdV2jlKUYA14jxNk6DqCpcOb69T6ZkUp5gEgcMl6j94HHtUa2_ff4azVzQT9eww-D2UuByj9RgQSfHpWHRvNUU"/>
      <img className="h-10 md:h-12 opacity-70 hover:opacity-100 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDN8fZOaGA3wTkBMmUZZtOjG3O6G-pQnw2cwO4iGgAvNLAP95hJyrmZjQjHuWWHGlSAsThjbwlSD7cNvaLuQCY3ESxy_nWp5hrGFFnT4NB3eOq8vbsml8TgNP1R_c9kvEAQ8RlPOljP2OMgFX3rQXer85chQMlxYHZwOSbkEOcqZY8tymgvHrBlE-1-N0TiK7CMpPbdNQEvSJiyDk6sE2I9A6oDBof2o6-650iRzeUJbOwYQVZ_J9V-ZmFumJsqV94rua9qs4VXrlk"/>
      <img className="h-8 md:h-10 opacity-70 hover:opacity-100 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-e3qASJZ-NAFj-LIPY5uwyk1rThl188NUgCPYdBrT0eigQN2ThoCl3MdH0ZNefqU1TNyGK3Vsi3lN9-cfgM7LGfJFY7AmqfVfdxiYYzkyj-Xm70oC-ekKURCZLzLeZscR17NdZoOS7R2yYn4Dby0z58xkc-7yl_gihu9Ip6oG7d5opDhyhXCIpazc7kXZ0vHttx76c8oMNU2-5dJciR2Gv-hcKOlP51GOr2RSEYuIMFJz1vZE7CvYQKVOiaAbTvKZQYSr-WxL6vw"/>
      <img className="h-10 md:h-12 opacity-70 hover:opacity-100 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAC2WH9PknwbE8Bn7ud4V2l7_i5GnsPA8oXGLQf9abaVvOy3RRyLAZdU5Vt5gU-GBE9xx4qYeF7bC0_B8Ie1jDr7-JZAS6fC0ELr5y-26xzsbS9TmgVxhwnma8FF-nC6GgjbeGfkO6fJX1q_FNXAsGuBVsyir7waWEn7vkvQ3xYvVwBW-WyoHMJH6Km4hfydNfvvs3rhvjnTtCY1LpdXqvkYv81fGMOrAd4cqKQUdYIVeWlCcPEl6o_qo4sA1nUPZ5HFFTQ-fcQCg0"/>
    </div>
  </div>
</div>
</div>
</motion.section>`;

content = content.replace(regex, newMarquee);

// We should also remove `<div className="max-w-7xl mx-auto px-6 text-center">`
// Actually the regex output I just made assumes `max-w-7xl` is closed at `</div>\n</motion.section>`, which is correct.
// Since we want edge to edge, we can modify the container:
content = content.replace(/<div className="max-w-7xl mx-auto px-6 text-center">\n<h4 className="text-sm font-bold text-slate-400 uppercase tracking-\[0\.2em\] mb-12">Our Students Are Hired By<\/h4>/,
  '<div className="w-full text-center">\n<h4 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-12">Our Students Are Hired By</h4>');

fs.writeFileSync(file, content, 'utf-8');
console.log('Done.');
