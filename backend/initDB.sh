#!/bin/bash

otxtbld=$(tput bold)             # Bold
bldred=${txtbld}$(tput setaf 1) # red
bldgre=${txtbld}$(tput setaf 2) # green
bldblu=${txtbld}$(tput setaf 4) # blue
txtrst=$(tput sgr0)             # Reset

cd `dirname $0`

getConfig() {
  echo $(grep "$1" config/configDefault.json | rev |cut -d \" -f2 | rev)
}

calcu_pwd=getConfig 'password'
calcu_usr=getConfig 'username'
pwd=getConfig 'rootpwd'
db_name=getConfig 'database'

if [ "$1" = "true" -o "$1" = "f" ]; then
  mysql -u root --password=$pwd <<< "
    DROP DATABASE IF EXISTS $db_name;
  "
fi
mysql -u root --password=$pwd <<< "
  CREATE DATABASE IF NOT EXISTS $db_name;
  grant all privileges on $db_name.* to '$calcu_usr'@'localhost' identified by '$calcu_pwd';
"

if [ "$?" != "0" ]; then
  echo "-------------------------------------------------------------------------------------"
  echo "${bldred}Initialize database failed $txtrst"
  echo "-------------------------------------------------------------------------------------"
  exit 2
fi

mysql -u calcu --password=$calcu_pwd <<< "
  use $db_name;
  CREATE TABLE IF NOT EXISTS User(
      id BIGINT not null AUTO_INCREMENT,
      ts DATETIME(3) not null,
      username VARCHAR(100) not null AUTO_INCREMENT,
      transcript VARCHAR(100) not null AUTO_INCREMENT,
      data JSON not null,
      score SMALLINT not null
      primary key (id)
  ) ENGINE=InnoDB;
"
