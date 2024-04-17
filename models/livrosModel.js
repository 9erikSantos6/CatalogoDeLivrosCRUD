const dbConn = require('../lib/db');

class LivrosModel {
    init() {
        const sql = `
        create table if not exists Livros (
            id int(10) primary key auto_increment not null,
            nome varchar(100) not null,
            autor varchar(50) not null,
            criado_em timestamp not null default current_timestamp,
            atualizado_em timestamp not null default current_timestamp on update current_timestamp
        );`;

        dbConn.query(sql, (err) => {
            if (err) {
                console.log('> Houve um erro ao criar a tabela Livros!')
                throw err;
            }
            console.log('> Conectado a tabela Livros com sucesso!')
        });
    }

    mostrar(req, res) {
        const sql = `select * from Livros order by id desc`;
        dbConn.query(sql, (err, linhas) => {
            if (err) {
                req.flash('error', err);
                res.render('livros', { data: '' });
                return;
            }
            res.render('livros', { data: linhas });
        });
    }

    adicionar(req, res) {
        const nome = req.body.nome;
        const autor = req.body.autor;
        let errors = false;

        if (nome.length === 0 || autor.length === 0) {
            errors = true;
            req.flash('error', 'Por favor, coloque o nome e o autor!');
            res.render('livros/adicionar', { nome: '', autor: '' });
        }

        if (!errors) {
            const form_data = {
                nome: nome,
                autor: autor
            }
            const sql = `insert into Livros set ?`;
            dbConn.query(sql, form_data, (err) => {
                if (err) {
                    req.flash('error', err);
                    res.render('livros/adicionar', {
                        nome: form_data.nome,
                        autor: form_data.autor
                    });
                    return;
                }
                req.flash('sucesso', 'Livros adicionados com sucesso!');
                res.redirect('/livros');
            });
        }
    }

    editar(req, res) {
        const id = req.params.id;
        const sql = `select * from Livros where id = ${id}`;
        dbConn.query(sql, (err, linhas) => {
            if (err) throw err;
    
            if (linhas.length <= 0) {
                req.flash('error', `Livro não encontrado com id ${id}!`);
                res.redirect('/livros');
                return;
            } 
            res.render('livros/editar', {
                titulo: 'Editar Livro',
                id: linhas[0].id,
                nome: linhas[0].nome,
                autor: linhas[0].autor
            });
        });
    }

    atualizar(req, res) {
        const id = req.params.id;
        const nome = req.body.nome;
        const autor = req.body.autor;
        let errors = false;
    
        if (nome.length === 0 || autor.length === 0) {
            errors = true;
            req.flash('error', 'Por favor, digite o nome e o autor!');
            res.render('livros/editar', { 
                id: id, 
                nome: nome,
                autor: autor
            });
            return;
        }
    
        if (!errors) {
            const form_data = {
                nome: nome,
                autor: autor
            }
            const sql = `update Livros set ? where id = ${id}`;
            dbConn.query(sql, form_data, (err) => {
                if (err) {
                    req.flash('error', err);
                    res.render('livros/editar', { 
                        id: id, 
                        nome: form_data.nome,
                        autor: form_data.autor
                    });
                    return;
                }
                req.flash('sucesso', 'Livro atualizado com sucesso!');
                res.redirect('/livros');
            });
        }
    }

    deletar(req, res) {
        const id = req.params.id;
        const sql = `delete from Livros where id = ${id}`;
        dbConn.query(sql, (err) => {
            if (err){
                req.flash(err);
                res.redirect('/livros');
                return;
            }
            req.flash('sucesso', `Livro deletado com sucesso! ID = ${id}`);
            res.redirect('/livros');
        });
    }
}

module.exports = new LivrosModel;