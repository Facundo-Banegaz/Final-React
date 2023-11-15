create database CATALOGO_DB;


use CATALOGO_DB;


create table  Articulos(
Id int auto_increment not null primary key,
Codigo varchar(50) not null,
Nombre varchar(50) not null,
Descripcion varchar(200) not null,
Precio decimal not null,
ImagenUrl varchar(1000) not null,
Fk_IdMarca int not null,
Fk_IdCategoria int not null,
 constraint foreign key (Fk_IdMarca)references Marcas(Id) on update cascade on delete cascade,
 constraint foreign key (Fk_IdCategoria)references Categorias(Id) on update cascade on delete cascade
);


create table Categorias(
Id int auto_increment not null primary key,
Descripcion varchar(50) not null
);


create table Marcas(
Id int auto_increment not null primary key,
Descripcion varchar(50) not null
);



insert into MARCAS (Id, Descripcion)
values (0,"Samsung"), (0,"Apple"), (0,"Sony"), (0,"Huawei"), (0,"Motorola");

insert into CATEGORIAS(Id, Descripcion)
 values (0,"Celulares"),(0,"Televisores"), (0,"Media"), (0,"Audio");

insert into ARTICULOS values
(0,"S01", "Galaxy S10", "El rey de la gama alta Android",15699,"https://tse2.mm.bing.net/th?id=OIP.d4cHUTk2w3-KLwrgklO-XgHaHc&pid=Api&P=0&h=180",13,17),

(0,"M03", "Moto G Play 7ma Gen", "Gran durabilidad",17699,"https://tse4.mm.bing.net/th?id=OIP.g3oXvKKkb7NQ5KUvl8RdQgHaHG&pid=Api&P=0&h=180",15,17);


select * from ARTICULOS;
select * from marcas;
select * from categorias;